import { forwardRef } from 'react';
import type { Scores } from '../utils/scoring';
import { RadarChart } from './RadarChart';

interface ShareStoryCardProps {
  scores: Scores;
  lang: 'en' | 'zh';
  topJob: string;
  matchScore: number;
}

function riasecLabel(key: string, lang: 'en' | 'zh'): string {
  const map: Record<string, { en: string; zh: string }> = {
    R: { en: 'Realistic', zh: '實做型' },
    I: { en: 'Investigative', zh: '研究型' },
    A: { en: 'Artistic', zh: '藝術型' },
    S: { en: 'Social', zh: '社交型' },
    E: { en: 'Enterprising', zh: '企業型' },
    C: { en: 'Conventional', zh: '常規型' },
  };
  return (map[key] ? map[key][lang] : key);
}

function barColor(key: string): string {
  const colors: Record<string, string> = {
    Openness: '#cba6f7',
    Conscientiousness: '#89b4fa',
    Extraversion: '#a6e3a1',
    Agreeableness: '#f9e2af',
    Neuroticism: '#fab387',
    Autonomy: '#89b4fa',
    Stability: '#a6e3a1',
    Growth: '#cba6f7',
    Impact: '#f9e2af',
  };
  return colors[key] || '#89b4fa';
}

// 1080x1920 Instagram Story share card.
export const ShareStoryCard = forwardRef<HTMLDivElement, ShareStoryCardProps>(
  ({ scores, lang, topJob, matchScore }, ref) => {
    const topRiasec = Object.entries(scores)
      .filter(([key]) => ['R', 'I', 'A', 'S', 'E', 'C'].includes(key))
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([key, value]) => ({ key, value }));

    const bigFive = [
      { key: 'Openness', label: lang === 'en' ? 'Openness' : '開放性', value: scores.Openness },
      { key: 'Conscientiousness', label: lang === 'en' ? 'Conscientiousness' : '盡責性', value: scores.Conscientiousness },
      { key: 'Extraversion', label: lang === 'en' ? 'Extraversion' : '外向性', value: scores.Extraversion },
      { key: 'Agreeableness', label: lang === 'en' ? 'Agreeableness' : '親和性', value: scores.Agreeableness },
      { key: 'Neuroticism', label: lang === 'en' ? 'Neuroticism' : '神經質', value: scores.Neuroticism },
    ];

    const values = [
      { key: 'Autonomy', label: lang === 'en' ? 'Autonomy' : '自主', value: scores.Autonomy },
      { key: 'Stability', label: lang === 'en' ? 'Stability' : '穩定', value: scores.Stability },
      { key: 'Growth', label: lang === 'en' ? 'Growth' : '成長', value: scores.Growth },
      { key: 'Impact', label: lang === 'en' ? 'Impact' : '影響力', value: scores.Impact },
    ];

    const mbtiLike = (() => {
      const ei = scores.Extraversion >= 50 ? 'E' : 'I';
      const ns = scores.Openness >= 50 ? 'N' : 'S';
      const tf = scores.Agreeableness >= 50 ? 'F' : 'T';
      const jp = scores.Conscientiousness >= 50 ? 'J' : 'P';
      return `${ei}${ns}${tf}${jp}`;
    })();

    return (
      <div
        ref={ref}
        className="relative overflow-hidden text-white font-sans"
        style={{
          width: 1080,
          height: 1920,
          backgroundImage: 'linear-gradient(135deg, #1e1e2e 0%, #313244 55%, #1e1e2e 100%)',
        }}
      >
        {/* Decorative blobs (avoid filters/backdrop-filter for better html-to-image reliability) */}
        <div
          className="absolute -top-40 -right-40 rounded-full opacity-20"
          style={{ width: 520, height: 520, background: '#cba6f7' }}
        />
        <div
          className="absolute -bottom-48 -left-48 rounded-full opacity-20"
          style={{ width: 620, height: 620, background: '#89b4fa' }}
        />

        <div className="relative h-full w-full px-[96px] pt-[112px] pb-[96px] flex flex-col">
          {/* Header */}
          <div className="text-center">
            <div className="text-[88px] leading-[1.0] font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#cba6f7] to-[#89b4fa]">
              CareerAdvisor
            </div>
            <div className="mt-5 text-[34px] text-[#a6adc8] font-medium">
              {lang === 'en' ? 'Career Fit Snapshot' : '職涯適配快照'}
            </div>
          </div>

          {/* Chart */}
          <div className="mt-[70px] flex items-center justify-center">
            <div className="w-[900px] h-[620px] bg-[#313244]/60 rounded-[56px] px-[36px] py-[28px] border border-[#45475a]">
              <div className="text-center text-[20px] text-[#a6adc8] font-semibold tracking-[0.14em] uppercase mb-2">
                {lang === 'en' ? 'RIASEC Interests' : 'RIASEC 興趣向度'}
              </div>
              <RadarChart scores={scores} darkMode={true} animate={false} lang={lang} className="h-[560px]" />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-[48px] grid grid-cols-2 gap-[28px]">
            <div className="bg-[#313244]/90 rounded-[40px] px-[34px] py-[26px] border-l-[10px] border-[#cba6f7]">
              <div className="text-[#a6adc8] text-[20px] uppercase tracking-[0.18em] font-semibold">
                {lang === 'en' ? 'Top Interests' : '主要興趣'}
              </div>
              <div className="mt-4 space-y-3">
                {topRiasec.map((t) => (
                  <div key={t.key} className="flex items-center gap-3">
                    <div className="w-[76px] text-[22px] font-extrabold text-[#cdd6f4]">{t.key}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-[20px] font-bold text-[#cdd6f4]">{riasecLabel(t.key, lang)}</div>
                        <div className="text-[18px] font-semibold text-[#a6adc8]">{t.value}</div>
                      </div>
                      <div className="mt-2 h-[10px] bg-[#45475a] rounded-full overflow-hidden">
                        <div className="h-full bg-[#cba6f7]" style={{ width: `${t.value}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[18px] text-[#a6adc8] font-semibold">
                {lang === 'en' ? 'Code' : '代碼'}: {topRiasec.map((t) => t.key).join('')}
              </div>
            </div>

            <div className="bg-[#313244]/90 rounded-[40px] px-[34px] py-[26px] border-l-[10px] border-[#89b4fa]">
              <div className="flex items-center justify-between gap-4">
                <div className="text-[#a6adc8] text-[20px] uppercase tracking-[0.18em] font-semibold">
                  {lang === 'en' ? 'Top Match' : '最佳適配'}
                </div>
                <div className="text-[18px] font-semibold text-[#a6adc8]">{matchScore}%</div>
              </div>
              <div className="mt-4 text-[34px] leading-[1.15] font-extrabold text-[#cdd6f4]">
                {topJob}
              </div>

              <div className="mt-6">
                <div className="text-[#a6adc8] text-[18px] uppercase tracking-[0.18em] font-semibold">
                  {lang === 'en' ? 'MBTI-like (estimated)' : 'MBTI-like（推估）'}
                </div>
                <div className="mt-2 text-[34px] font-extrabold tracking-[0.16em] text-[#cdd6f4]">
                  {mbtiLike}
                </div>
                <div className="mt-2 text-[18px] text-[#a6adc8]">
                  {lang === 'en' ? 'From Big Five, not MBTI.' : '由 Big Five 推估，非 MBTI。'}
                </div>
              </div>
            </div>
          </div>

          {/* Big Five + Values mini bars */}
          <div className="mt-[36px] grid grid-cols-2 gap-[28px]">
            <div className="bg-[#313244]/60 rounded-[40px] px-[34px] py-[24px] border border-[#45475a]">
              <div className="text-[#a6adc8] text-[20px] uppercase tracking-[0.18em] font-semibold">
                {lang === 'en' ? 'Big Five' : 'Big Five'}
              </div>
              <div className="mt-4 space-y-3">
                {bigFive.map((d) => (
                  <div key={d.key} className="flex items-center gap-4">
                    <div className="w-[220px] text-[20px] font-semibold text-[#cdd6f4]">{d.label}</div>
                    <div className="flex-1">
                      <div className="h-[10px] bg-[#45475a] rounded-full overflow-hidden">
                        <div className="h-full" style={{ width: `${d.value}%`, background: barColor(d.key) }} />
                      </div>
                    </div>
                    <div className="w-[56px] text-right text-[18px] font-semibold text-[#a6adc8]">{d.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#313244]/60 rounded-[40px] px-[34px] py-[24px] border border-[#45475a]">
              <div className="text-[#a6adc8] text-[20px] uppercase tracking-[0.18em] font-semibold">
                {lang === 'en' ? 'Work Values' : '工作價值觀'}
              </div>
              <div className="mt-4 space-y-3">
                {values.map((d) => (
                  <div key={d.key} className="flex items-center gap-4">
                    <div className="w-[220px] text-[20px] font-semibold text-[#cdd6f4]">{d.label}</div>
                    <div className="flex-1">
                      <div className="h-[10px] bg-[#45475a] rounded-full overflow-hidden">
                        <div className="h-full" style={{ width: `${d.value}%`, background: barColor(d.key) }} />
                      </div>
                    </div>
                    <div className="w-[56px] text-right text-[18px] font-semibold text-[#a6adc8]">{d.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-[36px] pt-[34px] border-t border-[#45475a] text-center">
            <div className="text-[#a6adc8] text-[24px]">
              {lang === 'en' ? 'Discover your path at' : '探索你的職涯方向：'}{' '}
              <span className="text-[#89b4fa] font-semibold">career-advisor-ray.netlify.app</span>
            </div>
            <div className="mt-2 text-[#6c7086] text-[18px]">
              {new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-TW')}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ShareStoryCard.displayName = 'ShareStoryCard';
