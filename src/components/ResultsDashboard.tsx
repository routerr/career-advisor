
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { type Scores, findJobMatches } from '../utils/scoring';
import { jobs } from '../data/jobs';
import { RadarChart } from './RadarChart';
import { ShareStoryModal } from './ShareStoryModal';
import { BigFiveChart } from './BigFiveChart';
import { WorkValuesChart } from './WorkValuesChart';
import { ChatGPTPromptModal } from './ChatGPTPromptModal';
import { RefreshCcw, Briefcase, DollarSign, Share2, Sparkles, Trash2, Undo2 } from 'lucide-react';
import { generateChatGPTPrompt } from '../utils/promptGenerator';
import type { StoredResults } from '../utils/cookies';

interface ResultsDashboardProps {
  scores: Scores;
  lang: 'en' | 'zh';
  onRestart: () => void;
  onRedoLastQuestion: () => void;
  darkMode: boolean;
  storedResults: StoredResults | null;
  onClearResults: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ scores, lang, onRestart, onRedoLastQuestion, darkMode, storedResults, onClearResults }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isChatGPTOpen, setIsChatGPTOpen] = useState(false);
  const [chatGPTPrompt, setChatGPTPrompt] = useState('');
  const [didAutoCopy, setDidAutoCopy] = useState(false);
  const [chatGPTModalKey, setChatGPTModalKey] = useState(0);

  const matches = useMemo(() => findJobMatches(scores, jobs), [scores]);
  const mbtiLike = useMemo(() => {
    const ei = scores.Extraversion >= 50 ? 'E' : 'I';
    const ns = scores.Openness >= 50 ? 'N' : 'S';
    const tf = scores.Agreeableness >= 50 ? 'F' : 'T';
    const jp = scores.Conscientiousness >= 50 ? 'J' : 'P';
    return `${ei}${ns}${tf}${jp}`;
  }, [scores]);

  const colorStyle = useMemo(() => {
    const E = scores.Extraversion >= 50;
    const A = scores.Agreeableness >= 50;
    const Cn = scores.Conscientiousness >= 50;
    // Simple 4-style snapshot (not DISC): Red/Yellow/Green/Blue.
    if (E && !A) return lang === 'en' ? 'Red (Direct / Results)' : '紅色（直接 / 結果導向）';
    if (E && A) return lang === 'en' ? 'Yellow (Expressive / People)' : '黃色（外放 / 人際導向）';
    if (!E && Cn) return lang === 'en' ? 'Blue (Analytical / Detail)' : '藍色（分析 / 細節導向）';
    return lang === 'en' ? 'Green (Steady / Supportive)' : '綠色（穩健 / 支持型）';
  }, [scores, lang]);

  const topTraits = useMemo(() => Object.entries(scores)
    .filter(([key]) => ['R', 'I', 'A', 'S', 'E', 'C'].includes(key))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3), [scores]);

  const matchedJobs = useMemo(() => matches.slice(0, 5), [matches]);
  const topJob = matchedJobs[0];

  if (!topJob) {
    console.error("No job matches found!", { scores, matches });
    return <div className="p-8 text-center">No matching jobs found. Please try again.</div>;
  }

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const handleChatGPTClick = async () => {
    const prompt = generateChatGPTPrompt(scores, matchedJobs, lang);
    setChatGPTPrompt(prompt);
    setDidAutoCopy(false);
    setChatGPTModalKey((k) => k + 1);
    setIsChatGPTOpen(true);

    // Open ChatGPT in a new tab (prefill isn't reliable; we prefer clipboard + paste).
    window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');

    // Try to copy prompt for reliable pasting.
    try {
      await navigator.clipboard.writeText(prompt);
      setDidAutoCopy(true);
    } catch {
      setDidAutoCopy(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 relative">
      <ShareStoryModal
        open={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        scores={scores}
        lang={lang}
        topJob={topJob.title[lang]}
        matchScore={topJob.matchScore}
      />
      <ChatGPTPromptModal
        key={chatGPTModalKey}
        open={isChatGPTOpen}
        onClose={() => setIsChatGPTOpen(false)}
        prompt={chatGPTPrompt}
        lang={lang}
        didAutoCopy={didAutoCopy}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">
          {lang === 'en' ? 'Your Career Profile' : '您的職涯分析'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {lang === 'en' ? 'Based on your innovative & problem-solving approach' : '基於您的創新與解決問題的方法'}
        </p>
        {storedResults && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {lang === 'en' ? 'Results saved from previous session' : '已儲存您上次的評估結果'}
          </p>
        )}
      </motion.div>

      <div className="space-y-8">
        {/* Radar Chart Section - Full Width, Reduced Height */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mx-auto"
        >
          <div className="h-[300px] md:h-[350px] w-full max-w-2xl mx-auto">
             <RadarChart scores={scores} darkMode={darkMode} lang={lang} />
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            {lang === 'en' ? 'RIASEC Interest Profile' : 'RIASEC 興趣向度'}
          </div>
        </motion.div>

        {/* Big Five */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="w-full bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mx-auto"
        >
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {lang === 'en' ? 'Big Five Personality' : '大五人格（Big Five）'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {lang === 'en' ? 'Trait tendencies (0-100)' : '特質傾向（0-100）'}
            </p>
          </div>
          <BigFiveChart scores={scores} darkMode={darkMode} lang={lang} />
        </motion.div>

        {/* Work Values */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mx-auto"
        >
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {lang === 'en' ? 'Work Values' : '工作價值觀'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {lang === 'en' ? 'What you want your work to optimize for (0-100)' : '你希望工作優先滿足的面向（0-100）'}
            </p>
          </div>
          <WorkValuesChart scores={scores} darkMode={darkMode} lang={lang} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="w-full bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
        >
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {lang === 'en' ? (
              <>
                This assessment combines <b>RIASEC</b> interests, <b>Big Five</b> personality (using public-domain IPIP items), and <b>work values</b>.
                The “MBTI-like” code shown in AI prompts is an <b>approximation</b> derived from Big Five traits and is <b>not MBTI</b>.
              </>
            ) : (
              <>
                本測驗結合 <b>RIASEC</b> 興趣向度、<b>Big Five</b> 人格特質（使用 IPIP 公有領域題項），以及 <b>工作價值觀</b>。
                AI 提示詞中的「MBTI-like」為基於 Big Five 的<b>推估</b>，<b>並非 MBTI</b>。
              </>
            )}
          </div>
        </motion.div>

        {/* Traits & Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <div className="bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="p-1 rounded bg-secondaryLight/10 dark:bg-secondaryDark/10 text-secondaryLight dark:text-secondaryDark">🧭</span>
              {lang === 'en' ? 'Style Snapshot' : '風格快照'}
            </h3>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-100 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {lang === 'en' ? 'MBTI-like (estimated)' : 'MBTI-like（推估）'}
                </div>
                <div className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-wide">
                  {mbtiLike}
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {lang === 'en' ? 'Derived from Big Five traits, not MBTI.' : '由 Big Five 推估，並非 MBTI。'}
                </div>
              </div>
              <div className="flex-1 rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-100 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {lang === 'en' ? 'Four-color communication style' : '四色溝通風格'}
                </div>
                <div className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">
                  {colorStyle}
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {lang === 'en' ? 'A lightweight snapshot for discussion, not a clinical measure.' : '作為討論用的簡化快照，非臨床或診斷工具。'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surfaceDark rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <span className="p-1 rounded bg-primaryLight/10 dark:bg-primaryDark/10 text-primaryLight dark:text-primaryDark">✨</span>
               {lang === 'en' ? 'Top Traits' : '主要特質'}
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {topTraits.map(([trait, score]) => {
                 const traitKey = trait as keyof Scores; // R, I, A...
                 const descriptions: Record<string, { en: string, zh: string, titleZh: string, titleEn: string }> = {
                   R: { titleEn: 'Realistic', titleZh: '實做型', en: 'Practical, hands-on, tool-oriented.', zh: '喜歡動手操作、機械與工具，重視實際應用。' },
                   I: { titleEn: 'Investigative', titleZh: '研究型', en: 'Analytical, intellectual, scientific.', zh: '喜歡思考、分析與解決複雜問題，重視邏輯。' },
                   A: { titleEn: 'Artistic', titleZh: '藝術型', en: 'Creative, expressive, original.', zh: '喜歡創新、自我表達與設計，重視美感與直覺。' },
                   S: { titleEn: 'Social', titleZh: '社交型', en: 'Cooperative, helpful, understanding.', zh: '喜歡與人互動、幫助他人與教學，重視人際關係。' },
                   E: { titleEn: 'Enterprising', titleZh: '企業型', en: 'Ambitious, energetic, persuasive.', zh: '喜歡領導、說服與達成目標，重視影響力。' },
                   C: { titleEn: 'Conventional', titleZh: '常規型', en: 'Organized, precise, detailed.', zh: '喜歡有序、精確與處理數據，重視規則與細節。' }
                 };
                 const info = descriptions[traitKey] || { titleEn: trait, titleZh: trait, en: '', zh: '' };

                 return (
                   <div key={trait} className="group relative p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-primaryLight/5 dark:hover:bg-primaryDark/5 transition-colors cursor-help">
                     <div className="flex items-center justify-between mb-3">
                       <span className="font-bold text-lg text-primaryLight dark:text-primaryDark">
                         {lang === 'en' ? info.titleEn : info.titleZh}
                       </span>
                       <span className="font-bold text-gray-500">{score}/100</span>
                     </div>
                     
                     <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full bg-secondaryLight dark:bg-secondaryDark" 
                          style={{ width: `${score}%` }}
                        />
                     </div>

                     {/* Hover Description Tooltip */}
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-surfaceLight dark:bg-zinc-800 p-4 rounded-xl flex items-center justify-center text-center shadow-xl z-10 pointer-events-none group-hover:pointer-events-auto">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {lang === 'en' ? info.en : info.zh}
                        </p>
                     </div>
                     
                     {/* Mobile/Default visible description (optional, keeping it clean for now, only hover/tap) */}
                     <div className="block md:hidden text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {lang === 'en' ? info.en : info.zh}
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Recommended Jobs */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Briefcase className="text-primaryLight dark:text-primaryDark" />
          {lang === 'en' ? 'Recommended Roles' : '推薦職位'}
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {matchedJobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (idx * 0.1) }}
              className="bg-white dark:bg-surfaceDark rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h4 className="text-xl font-bold mb-1 text-primaryLight dark:text-primaryDark">
                  {job.title[lang]}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {job.description[lang]}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                   <div className="flex items-center gap-1">
                     <DollarSign size={16} />
                     {job.salaryRange.min.toLocaleString()} - {job.salaryRange.max.toLocaleString()} {job.salaryRange.currency}
                   </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="text-right">
                   <div className="text-xs text-gray-400 uppercase tracking-wide">Match</div>
                   <div className="text-2xl font-bold text-green-500">{job.matchScore}%</div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="text-center pt-8 pb-12 flex flex-col md:flex-row items-center justify-center gap-4">
        <button 
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-surfaceLight dark:bg-surfaceDark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-200 dark:border-gray-700"
        >
          <RefreshCcw size={18} />
          {lang === 'en' ? 'Start Over' : '重新開始'}
        </button>

        <button
          onClick={onRedoLastQuestion}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/80 dark:bg-surfaceDark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-200 dark:border-gray-700"
        >
          <Undo2 size={18} />
          {lang === 'en' ? 'Last Question' : '最後一題'}
        </button>

        <button 
          onClick={handleChatGPTClick}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-secondaryLight to-accentLight dark:from-secondaryDark dark:to-accentDark text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all font-bold"
        >
          <Sparkles size={18} />
          {lang === 'en' ? 'Continue with ChatGPT' : '使用 ChatGPT 取得建議'}
        </button>

        <button 
          onClick={handleShare}
          disabled={isShareOpen}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark text-white hover:opacity-90 transition-opacity font-bold"
        >
          <Share2 size={18} />
          {lang === 'en' ? 'Share Results' : '分享結果'}
        </button>
      </div>

      {storedResults && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <button 
            onClick={onClearResults}
            className="inline-flex items-center gap-2 px-6 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 size={14} />
            {lang === 'en' ? 'Clear Saved Results' : '清除已儲存的結果'}
          </button>
        </motion.div>
      )}
    </div>
  );
};
