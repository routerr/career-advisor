import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionEngine } from './components/QuestionEngine';
import { ResultsDashboard } from './components/ResultsDashboard';
import { questions } from './data/questions';
import { calculateScores, initialScores, type Scores } from './utils/scoring';
import { saveResultsToCookies, getResultsFromCookies, clearStoredResults, type StoredResults } from './utils/cookies';
import { clearQuizProgress, loadQuizProgress, saveQuizProgress } from './utils/progressStorage';

function deriveLastAnsweredIndexFromAnswers(a: Record<string, number>): number {
  for (let i = questions.length - 1; i >= 0; i -= 1) {
    const qid = questions[i]?.id;
    if (qid && typeof a[qid] === 'number') return i;
  }
  return -1;
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const initialProgress = useMemo(() => loadQuizProgress(), []);
  const [lang, setLang] = useState<'en' | 'zh'>(initialProgress?.lang ?? 'zh');
  const [screen, setScreen] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const idx = initialProgress?.currentQuestionIndex ?? 0;
    if (!Number.isFinite(idx) || idx < 0) return 0;
    return Math.min(idx, Math.max(0, questions.length - 1));
  });
  const [answers, setAnswers] = useState<Record<string, number>>(() => initialProgress?.answers ?? {});
  const [lastAnsweredIndex, setLastAnsweredIndex] = useState(() => {
    const idx = initialProgress?.lastAnsweredIndex;
    if (typeof idx === 'number' && Number.isFinite(idx)) return idx;
    const a = initialProgress?.answers;
    return a ? deriveLastAnsweredIndexFromAnswers(a) : -1;
  });
  const [finalScores, setFinalScores] = useState<Scores>(initialScores);
  const [storedResults, setStoredResults] = useState<StoredResults | null>(() => getResultsFromCookies());

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = useCallback(() => setDarkMode(prev => !prev), []);
  const toggleLang = useCallback(() => setLang(l => l === 'en' ? 'zh' : 'en'), []);

  const handleGoHome = useCallback(() => {
    setScreen('welcome');
  }, []);

  const handleRestartQuiz = useCallback(() => {
    clearQuizProgress();
    setAnswers({});
    setCurrentQuestionIndex(0);
    setLastAnsweredIndex(-1);
    setScreen('quiz');
  }, []);

  const handleContinue = useCallback(() => {
    const progress = loadQuizProgress();
    if (!progress) return;
    const resumeIdx =
      typeof progress.lastAnsweredIndex === 'number' && Number.isFinite(progress.lastAnsweredIndex)
        ? progress.lastAnsweredIndex
        : deriveLastAnsweredIndexFromAnswers(progress.answers);
    setLang(progress.lang);
    setAnswers(progress.answers);
    setLastAnsweredIndex(resumeIdx);
    setCurrentQuestionIndex(Math.min(Math.max(0, resumeIdx), Math.max(0, questions.length - 1)));
    setScreen('quiz');
  }, []);

  const handleViewStoredResults = useCallback(() => {
    if (storedResults) {
      setFinalScores(storedResults.scores);
      setLang(storedResults.lang);
      setScreen('results');
    }
  }, [storedResults]);

  const handleClearResults = useCallback(() => {
    clearStoredResults();
    setStoredResults(null);
  }, []);

  const handleAnswerWrapper = useCallback((questionId: string, optionIndex: number) => {
    const nextIndex = Math.min(currentQuestionIndex + 1, Math.max(0, questions.length - 1));
    setLastAnsweredIndex(currentQuestionIndex);
    if (currentQuestionIndex < questions.length - 1) {
      setAnswers(prev => {
        const newAnswers = { ...prev, [questionId]: optionIndex };
        saveQuizProgress({
          answers: newAnswers,
          currentQuestionIndex: nextIndex,
          lastAnsweredIndex: currentQuestionIndex,
          lang,
          timestamp: Date.now()
        });
        return newAnswers;
      });
      setTimeout(() => {
        setCurrentQuestionIndex(prev => Math.min(prev + 1, Math.max(0, questions.length - 1)));
      }, 300);
    } else {
      setAnswers(prev => {
        const finalAnswers = { ...prev, [questionId]: optionIndex };
        const scores = calculateScores(questions, finalAnswers);
        setFinalScores(scores);

        const newStoredResults: StoredResults = {
          version: 2,
          scores,
          timestamp: Date.now(),
          lang
        };
        saveResultsToCookies(newStoredResults);
        setStoredResults(newStoredResults);
        setScreen('results');
        saveQuizProgress({
          answers: finalAnswers,
          currentQuestionIndex,
          lastAnsweredIndex: currentQuestionIndex,
          lang,
          timestamp: Date.now()
        });
        return finalAnswers;
      });
    }
  }, [currentQuestionIndex, lang]);

  useEffect(() => {
    // Keep progress saved as the user navigates back/forward or changes language.
    if (Object.keys(answers).length === 0) return;
    const safeLastAnsweredIndex =
      typeof lastAnsweredIndex === 'number' && Number.isFinite(lastAnsweredIndex) && lastAnsweredIndex >= 0
        ? lastAnsweredIndex
        : deriveLastAnsweredIndexFromAnswers(answers);
    saveQuizProgress({ answers, currentQuestionIndex, lastAnsweredIndex: safeLastAnsweredIndex, lang, timestamp: Date.now() });
  }, [answers, currentQuestionIndex, lang, lastAnsweredIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentQuestionIndex(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleRedoLastQuestion = useCallback(() => {
    const lastIdx = Math.max(0, questions.length - 1);
    setCurrentQuestionIndex(lastIdx);
    setLastAnsweredIndex(lastIdx);
    setScreen('quiz');
  }, []);

  const progressAnsweredCount = Object.keys(answers).length;
  const safeLastAnsweredIndex =
    typeof lastAnsweredIndex === 'number' && Number.isFinite(lastAnsweredIndex) && lastAnsweredIndex >= 0
      ? lastAnsweredIndex
      : deriveLastAnsweredIndexFromAnswers(answers);
  const canContinue = progressAnsweredCount > 0 && progressAnsweredCount < questions.length && safeLastAnsweredIndex >= 0;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark font-sans selection:bg-primaryLight selection:text-white">
        <Header 
          darkMode={darkMode} 
          toggleTheme={toggleTheme} 
          lang={lang} 
          toggleLang={toggleLang} 
          onHome={handleGoHome}
        />
        
        <main className="pt-24 pb-12 container mx-auto px-4 min-h-[calc(100vh-6rem)] flex flex-col justify-center">
          {screen === 'welcome' && (
            <WelcomeScreen 
              onStart={handleRestartQuiz}
              onContinue={handleContinue}
              canContinue={canContinue}
              progressText={lang === 'en' ? `Progress: ${progressAnsweredCount} / ${questions.length}` : `進度：${progressAnsweredCount} / ${questions.length}`}
              onViewStoredResults={handleViewStoredResults}
              lang={lang} 
              storedResults={storedResults}
              questionsCount={questions.length}
            />
          )}
          
          {screen === 'quiz' && (
            <QuestionEngine 
              questions={questions} 
              currentIndex={currentQuestionIndex} 
              onAnswer={handleAnswerWrapper}
              onPrevious={handlePrevious}
              onRestart={handleRestartQuiz}
              selectedAnswer={answers[questions[currentQuestionIndex]?.id]}
              lang={lang}
            />
          )}

          {screen === 'results' && (
            <ResultsDashboard 
              scores={finalScores} 
              lang={lang} 
              onRestart={handleRestartQuiz}
              onRedoLastQuestion={handleRedoLastQuestion}
              darkMode={darkMode}
              storedResults={storedResults}
              onClearResults={handleClearResults}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
