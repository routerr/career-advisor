export interface StoredQuizProgress {
  answers: Record<string, number>;
  currentQuestionIndex: number;
  lastAnsweredIndex: number;
  lang: 'en' | 'zh';
  darkMode: boolean;
  timestamp: number;
}

// v2: answers store Likert values (1-5), and we include lastAnsweredIndex.
const PROGRESS_KEY = 'career_advisor_quiz_progress_v2';

function isRecordOfNumbers(value: unknown): value is Record<string, number> {
  if (!value || typeof value !== 'object') return false;
  for (const [, v] of Object.entries(value as Record<string, unknown>)) {
    if (typeof v !== 'number' || !Number.isFinite(v)) return false;
  }
  return true;
}

export function saveQuizProgress(progress: StoredQuizProgress): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors (privacy mode, disabled storage, etc.)
  }
}

export function loadQuizProgress(): StoredQuizProgress | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredQuizProgress>;
    if (!parsed) return null;

    const { answers, currentQuestionIndex, lastAnsweredIndex, lang, darkMode, timestamp } = parsed;
    if (!isRecordOfNumbers(answers)) return null;
    if (typeof currentQuestionIndex !== 'number' || !Number.isFinite(currentQuestionIndex)) return null;
    const safeLastAnsweredIndex =
      typeof lastAnsweredIndex === 'number' && Number.isFinite(lastAnsweredIndex) ? lastAnsweredIndex : -1;
    if (lang !== 'en' && lang !== 'zh') return null;
    const safeDarkMode = typeof darkMode === 'boolean' ? darkMode : true;
    if (typeof timestamp !== 'number' || !Number.isFinite(timestamp)) return null;

    return { answers, currentQuestionIndex, lastAnsweredIndex: safeLastAnsweredIndex, lang, darkMode: safeDarkMode, timestamp };
  } catch {
    return null;
  }
}

export function clearQuizProgress(): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // Ignore
  }
}
