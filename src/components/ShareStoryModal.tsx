import React, { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Loader2, X } from 'lucide-react';
import type { Scores } from '../utils/scoring';
import { ShareStoryCard } from './ShareStoryCard';

interface ShareStoryModalProps {
  open: boolean;
  onClose: () => void;
  scores: Scores;
  lang: 'en' | 'zh';
  topJob: string;
  matchScore: number;
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const ShareStoryModal: React.FC<ShareStoryModalProps> = ({
  open,
  onClose,
  scores,
  lang,
  topJob,
  matchScore,
}) => {
  const storyRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [filename, setFilename] = useState(() => `career-story-${Date.now()}.png`);

  useEffect(() => {
    if (open) setFilename(`career-story-${Date.now()}.png`);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setIsGenerating(true);
    setPngDataUrl(null);

    (async () => {
      try {
        // Wait for modal to mount + fonts to be ready.
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        if (document.fonts?.ready) await document.fonts.ready;
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

        if (!storyRef.current) return;

        const dataUrl = await toPng(storyRef.current, {
          cacheBust: true,
          backgroundColor: '#1e1e2e',
          width: 1080,
          height: 1920,
          pixelRatio: 1,
        });

        if (!cancelled) setPngDataUrl(dataUrl);
      } catch (err) {
        console.error('Failed to generate story PNG', err);
        if (!cancelled) setPngDataUrl(null);
      } finally {
        if (!cancelled) setIsGenerating(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, scores, lang, topJob, matchScore]);

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
    <div className="fixed inset-0 z-[1000]">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[980px] rounded-2xl bg-white dark:bg-surfaceDark shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="font-bold text-gray-900 dark:text-gray-100">
              {lang === 'en' ? 'Share to Instagram Story' : '分享成 Instagram Story'}
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

          <div className="p-5">
            <div className="rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-700 p-4 flex items-center justify-center">
              {pngDataUrl ? (
                <img
                  src={pngDataUrl}
                  alt={lang === 'en' ? 'Story preview' : '圖片預覽'}
                  className="max-h-[70vh] w-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold">
                    <Loader2 size={18} className={isGenerating ? 'animate-spin' : ''} />
                    {isGenerating
                      ? (lang === 'en' ? 'Generating PNG…' : '正在產生圖片…')
                      : (lang === 'en' ? 'Failed to generate PNG' : '產生圖片失敗')}
                  </div>
                  <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    {lang === 'en'
                      ? 'Output size: 1080x1920 (Instagram Story)'
                      : '輸出尺寸：1080x1920（IG 限時動態）'}
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {lang === 'en'
                      ? 'If generation fails, try refreshing and sharing again.'
                      : '若產生失敗，請重新整理後再試一次。'}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => (pngDataUrl ? downloadDataUrl(pngDataUrl, filename) : undefined)}
                disabled={!pngDataUrl}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {lang === 'en' ? 'Download Image' : '下載圖片'}
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

      {/* Offscreen render target for html-to-image capture (do not use negative z-index). */}
      <div aria-hidden="true" style={{ position: 'absolute', left: -20000, top: 0, pointerEvents: 'none' }}>
        <ShareStoryCard ref={storyRef} scores={scores} lang={lang} topJob={topJob} matchScore={matchScore} />
      </div>
    </div>
  );
};
