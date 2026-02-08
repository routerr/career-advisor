import React, { memo, useMemo } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Scores } from '../utils/scoring';

interface WorkValuesChartProps {
  scores: Scores;
  darkMode: boolean;
  lang: 'en' | 'zh';
}

export const WorkValuesChart: React.FC<WorkValuesChartProps> = memo(({ scores, darkMode, lang }) => {
  const data = useMemo(() => ([
    { key: 'Autonomy', name: lang === 'en' ? 'Autonomy' : '自主', value: scores.Autonomy },
    { key: 'Stability', name: lang === 'en' ? 'Stability' : '穩定', value: scores.Stability },
    { key: 'Growth', name: lang === 'en' ? 'Growth' : '成長', value: scores.Growth },
    { key: 'Impact', name: lang === 'en' ? 'Impact' : '影響力', value: scores.Impact },
  ]), [scores, lang]);

  const gridColor = darkMode ? '#45475a' : '#e5e7eb';
  const textColor = darkMode ? '#cdd6f4' : '#4c4f69';
  const barColor = darkMode ? '#89b4fa' : '#1e66f5';

  return (
    <div className="w-full h-[260px]">
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

WorkValuesChart.displayName = 'WorkValuesChart';
