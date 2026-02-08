
import React, { memo } from 'react';
import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { Scores } from '../utils/scoring';

interface RadarChartProps {
  scores: Scores;
  darkMode: boolean;
  animate?: boolean;
  lang?: 'en' | 'zh';
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = memo(({ scores, darkMode, animate = true, lang = 'zh', className }) => {
  const subjects = {
    R: { en: 'Realistic', zh: '實做型' },
    I: { en: 'Investigative', zh: '研究型' },
    A: { en: 'Artistic', zh: '藝術型' },
    S: { en: 'Social', zh: '社交型' },
    E: { en: 'Enterprising', zh: '企業型' },
    C: { en: 'Conventional', zh: '常規型' },
  };

  const data = [
    { subject: subjects.R[lang], A: scores.R, fullMark: 100 },
    { subject: subjects.I[lang], A: scores.I, fullMark: 100 },
    { subject: subjects.A[lang], A: scores.A, fullMark: 100 },
    { subject: subjects.S[lang], A: scores.S, fullMark: 100 },
    { subject: subjects.E[lang], A: scores.E, fullMark: 100 },
    { subject: subjects.C[lang], A: scores.C, fullMark: 100 },
  ];

  const textColor = darkMode ? '#cdd6f4' : '#4c4f69';
  const gridColor = darkMode ? '#45475a' : '#bcc0cc';
  const areaColor = darkMode ? '#89b4fa' : '#1e66f5';

  return (
    <div className={className ? `w-full ${className}` : "w-full h-[300px] md:h-[400px]"}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar outerRadius="80%" data={data}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="My Profile"
            dataKey="A"
            stroke={areaColor}
            fill={areaColor}
            fillOpacity={0.5}
            isAnimationActive={animate}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
});

RadarChart.displayName = 'RadarChart';
