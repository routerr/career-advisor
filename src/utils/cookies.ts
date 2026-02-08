const COOKIE_EXPIRY_DAYS = 365;

// Stored result schema version. Bump when score dimensions change.
const RESULTS_SCHEMA_VERSION = 2;

export interface StoredScoresV2 {
  // Normalized 0-100 scores.
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
  Openness: number;
  Conscientiousness: number;
  Extraversion: number;
  Agreeableness: number;
  Neuroticism: number;
  Autonomy: number;
  Stability: number;
  Growth: number;
  Impact: number;
}

export interface StoredResults {
  version: typeof RESULTS_SCHEMA_VERSION;
  scores: StoredScoresV2;
  timestamp: number;
  lang: 'en' | 'zh';
}

export function setCookie(name: string, value: string, days: number = COOKIE_EXPIRY_DAYS): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

const RESULTS_COOKIE_NAME = 'career_advisor_results';

export function saveResultsToCookies(results: StoredResults): void {
  setCookie(RESULTS_COOKIE_NAME, JSON.stringify(results));
}

export function getResultsFromCookies(): StoredResults | null {
  const cookieValue = getCookie(RESULTS_COOKIE_NAME);
  if (!cookieValue) return null;
  
  try {
    const parsed = JSON.parse(cookieValue);
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed.version !== RESULTS_SCHEMA_VERSION) return null;
    if (!parsed.scores || typeof parsed.scores !== 'object') return null;
    if (typeof parsed.timestamp !== 'number') return null;
    if (parsed.lang !== 'en' && parsed.lang !== 'zh') return null;

    const s = parsed.scores as Partial<StoredScoresV2>;
    const requiredKeys: (keyof StoredScoresV2)[] = [
      'R','I','A','S','E','C',
      'Openness','Conscientiousness','Extraversion','Agreeableness','Neuroticism',
      'Autonomy','Stability','Growth','Impact'
    ];
    for (const k of requiredKeys) {
      if (typeof s[k] !== 'number' || !Number.isFinite(s[k] as number)) return null;
    }
    return parsed as StoredResults;
  } catch {
    return null;
  }
  return null;
}

export function hasStoredResults(): boolean {
  return getCookie(RESULTS_COOKIE_NAME) !== null;
}

export function clearStoredResults(): void {
  deleteCookie(RESULTS_COOKIE_NAME);
}
