
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, History, Play } from 'lucide-react';
import type { StoredResults } from '../utils/cookies';

interface WelcomeScreenProps {
  onStart: () => void;
  onContinue?: () => void;
  canContinue?: boolean;
  progressText?: string;
  onViewStoredResults?: () => void;
  lang: 'en' | 'zh';
  storedResults: StoredResults | null;
  questionsCount?: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onContinue,
  canContinue = false,
  progressText,
  onViewStoredResults,
  lang,
  storedResults,
  questionsCount,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-4 rounded-full bg-primaryLight/10 dark:bg-primaryDark/10 text-primaryLight dark:text-primaryDark"
      >
        <Sparkles size={48} />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark inline-block"
      >
        {lang === 'en' ? 'Discover Your Path' : '探索您的職涯道路'}
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-md"
      >
        {lang === 'en'
          ? 'Complete a 15–20 minute assessment to discover career paths that fit your interests, personality, and values.'
          : '用 15～20 分鐘完成測驗，找出更符合你興趣、人格特質與價值觀的職涯方向。'}
      </motion.p>

      {typeof questionsCount === 'number' && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {lang === 'en' ? `${questionsCount} questions` : `共 ${questionsCount} 題`}
        </div>
      )}

      {canContinue && onContinue && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.38 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="group relative px-8 py-4 bg-gradient-to-r from-secondaryLight to-accentLight dark:from-secondaryDark dark:to-accentDark text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mb-3"
        >
          <Play size={18} />
          {lang === 'en' ? 'Continue' : '繼續測驗'}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}

      {canContinue && progressText && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {progressText}
        </div>
      )}

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: canContinue ? 0.44 : 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative px-8 py-4 bg-gradient-to-r from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark text-white dark:text-bgDark font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mb-4"
      >
        {lang === 'en' ? 'Start Assessment' : '開始評估'}
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {storedResults && onViewStoredResults && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewStoredResults}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
        >
          <History size={18} />
          {lang === 'en' ? 'View Previous Results' : '查看上次結果'}
        </motion.button>
      )}
    </div>
  );
};
