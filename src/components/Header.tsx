
import { Moon, Sun, Languages } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  lang: 'en' | 'zh';
  toggleLang: () => void;
  onHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme, lang, toggleLang, onHome }) => {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-opacity-80 backdrop-blur-md bg-bgLight dark:bg-bgDark shadow-sm">
      <button
        type="button"
        onClick={onHome}
        className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-surfaceLight/70 dark:hover:bg-surfaceDark/60 transition-colors"
        aria-label={lang === 'en' ? 'Go to landing page' : '回到首頁'}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark flex items-center justify-center text-white font-bold">
          CA
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark">
          Career<span className="font-light text-textLight dark:text-textDark">Advisor</span>
        </h1>
      </button>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleLang}
          className="p-2 rounded-full hover:bg-surfaceLight dark:hover:bg-surfaceDark transition-colors flex items-center gap-1 text-sm font-medium"
        >
          <Languages size={20} />
          <span>{lang === 'en' ? 'EN' : '中'}</span>
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-surfaceLight dark:hover:bg-surfaceDark transition-colors text-yellow-500 dark:text-primaryDark"
        >
          {darkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};
