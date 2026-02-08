
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '../data/questions';
import { Check } from 'lucide-react';

interface QuestionEngineProps {
  questions: Question[];
  currentIndex: number;
  onAnswer: (questionId: string, value: number) => void;
  onPrevious: () => void;
  onRestart: () => void;
  selectedAnswer?: number;
  lang: 'en' | 'zh';
}

export const QuestionEngine: React.FC<QuestionEngineProps> = ({ questions, currentIndex, onAnswer, onPrevious, onRestart, selectedAnswer, lang }) => {
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  if (!currentQuestion) return null;

  const sectionLabel = (() => {
    if (currentQuestion.kind === 'riasec') return lang === 'en' ? 'Interests (RIASEC)' : '興趣向度（RIASEC）';
    if (currentQuestion.kind === 'big5') return lang === 'en' ? 'Personality (Big Five)' : '人格特質（Big Five）';
    return lang === 'en' ? 'Work Values' : '工作價值觀';
  })();

  const likertOptions = lang === 'en'
    ? [
        { label: 'Strongly disagree', value: 1 },
        { label: 'Disagree', value: 2 },
        { label: 'Neutral', value: 3 },
        { label: 'Agree', value: 4 },
        { label: 'Strongly agree', value: 5 },
      ]
    : [
        { label: '非常不同意', value: 1 },
        { label: '不同意', value: 2 },
        { label: '普通', value: 3 },
        { label: '同意', value: 4 },
        { label: '非常同意', value: 5 },
      ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-surfaceLight dark:bg-surfaceDark rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-primaryLight dark:bg-primaryDark transition-all duration-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              {sectionLabel}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {lang === 'en' ? 'Answer based on your typical behavior.' : '請以你「平常通常」的狀態作答。'}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-textLight dark:text-textDark">
            {currentQuestion.text[lang]}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {likertOptions.map((opt) => {
              const isSelected = selectedAnswer === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onAnswer(currentQuestion.id, opt.value)}
                  className={`w-full px-5 py-4 rounded-xl shadow-sm border transition-all group flex items-center justify-between ${
                    isSelected
                      ? 'bg-primaryLight/10 dark:bg-primaryDark/10 border-primaryLight dark:border-primaryDark'
                      : 'bg-white dark:bg-surfaceDark border-transparent hover:border-primaryLight dark:hover:border-primaryDark'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-primaryLight dark:border-primaryDark bg-primaryLight dark:bg-primaryDark text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 group-hover:border-primaryLight dark:group-hover:border-primaryDark'
                      }`}
                    >
                      {isSelected ? <Check size={16} /> : <span className="text-sm font-semibold">{opt.value}</span>}
                    </div>
                    <span className={`text-base md:text-lg font-medium ${
                      isSelected
                        ? 'text-primaryLight dark:text-primaryDark'
                        : 'text-gray-800 dark:text-gray-100 group-hover:text-primaryLight dark:group-hover:text-primaryDark'
                    }`}>
                      {opt.label}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
             currentIndex === 0 
               ? 'opacity-0 cursor-default' 
               : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
        >
          {lang === 'en' ? '← Previous' : '← 上一題'}
        </button>

        <div className="text-sm text-gray-500">
          {currentIndex + 1} / {questions.length}
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="px-4 py-2 rounded-lg transition-colors font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {lang === 'en' ? 'Restart' : '重新開始'}
        </button>
      </div>
    </div>
  );
};
