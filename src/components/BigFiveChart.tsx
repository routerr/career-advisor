import React, { memo, useMemo } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Scores } from '../utils/scoring';

interface BigFiveChartProps {
  scores: Scores;
  darkMode: boolean;
  lang: 'en' | 'zh';
}

export const BigFiveChart: React.FC<BigFiveChartProps> = memo(({ scores, darkMode, lang }) => {
  const data = useMemo(() => ([
    { key: 'Openness', name: lang === 'en' ? 'Openness' : '開放性', value: scores.Openness },
    { key: 'Conscientiousness', name: lang === 'en' ? 'Conscientiousness' : '盡責性', value: scores.Conscientiousness },
    { key: 'Extraversion', name: lang === 'en' ? 'Extraversion' : '外向性', value: scores.Extraversion },
    { key: 'Agreeableness', name: lang === 'en' ? 'Agreeableness' : '親和性', value: scores.Agreeableness },
    { key: 'Neuroticism', name: lang === 'en' ? 'Neuroticism' : '神經質傾向', value: scores.Neuroticism },
  ]), [scores, lang]);

  const gridColor = darkMode ? '#45475a' : '#e5e7eb';
  const textColor = darkMode ? '#cdd6f4' : '#4c4f69';
  const barColor = darkMode ? '#cba6f7' : '#8839ef';

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 12 }} interval={0} />
          <YAxis domain={[0, 100]} tick={{ fill: textColor, fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: darkMode ? 'rgba(69,71,90,0.35)' : 'rgba(229,231,235,0.6)' }}
            contentStyle={{
              background: darkMode ? '#1e1e2e' : '#ffffff',
              border: `1px solid ${gridColor}`,
              borderRadius: 10,
              color: textColor,
            }}
            formatter={(v: unknown) => [`${typeof v === 'number' ? v : ''}`, lang === 'en' ? 'Score' : '分數']}
          />
          <Bar dataKey="value" fill={barColor} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

BigFiveChart.displayName = 'BigFiveChart';
