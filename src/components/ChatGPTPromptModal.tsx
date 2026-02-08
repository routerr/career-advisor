import React, { useEffect, useRef, useState } from 'react';
import { X, Copy, ExternalLink } from 'lucide-react';

interface ChatGPTPromptModalProps {
  open: boolean;
  onClose: () => void;
  prompt: string;
  lang: 'en' | 'zh';
  didAutoCopy?: boolean;
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export const ChatGPTPromptModal: React.FC<ChatGPTPromptModalProps> = ({
  open,
  onClose,
  prompt,
  lang,
  didAutoCopy = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [manuallyCopied, setManuallyCopied] = useState(false);
  const copied = didAutoCopy || manuallyCopied;

  useEffect(() => {
    if (!open) return;
    // Select prompt for easy manual copy.
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }, 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-surfaceDark shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="font-bold text-gray-900 dark:text-gray-100">
              {lang === 'en' ? 'ChatGPT Suggestions' : '使用 ChatGPT 取得建議'}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
              aria-label={lang === 'en' ? 'Close' : '關閉'}
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {copied
                ? (lang === 'en' ? 'Prompt copied. Paste it into ChatGPT.' : '提示詞已複製，請到 ChatGPT 貼上。')
                : (lang === 'en' ? 'Copy the prompt and paste it into ChatGPT.' : '請複製提示詞並貼到 ChatGPT。')}
            </div>

            <textarea
              ref={textareaRef}
              value={prompt}
              readOnly
              className="w-full h-[320px] rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 p-4 text-sm font-mono text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-primaryLight dark:focus:ring-primaryDark"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={async () => {
                  const ok = await copyToClipboard(prompt);
                  if (ok) setManuallyCopied(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark text-white font-bold"
              >
                <Copy size={18} />
                {lang === 'en' ? 'Copy Prompt' : '複製提示詞'}
              </button>
              <button
                type="button"
                onClick={() => window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/80 dark:bg-surfaceDark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-200 dark:border-gray-700"
              >
                <ExternalLink size={18} />
                {lang === 'en' ? 'Open ChatGPT' : '開啟 ChatGPT'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-surfaceLight dark:bg-surfaceDark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium border border-gray-200 dark:border-gray-700"
              >
                {lang === 'en' ? 'Close' : '關閉'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
