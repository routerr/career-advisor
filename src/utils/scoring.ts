
import type { Question } from '../data/questions';
import type { Job } from '../data/jobs';

export interface Scores {
  // Normalized 0-100 for consistent charting.
  R: number; I: number; A: number; S: number; E: number; C: number;
  Openness: number; Conscientiousness: number; Extraversion: number; Agreeableness: number; Neuroticism: number;
  Autonomy: number; Stability: number; Growth: number; Impact: number;
}

export const initialScores: Scores = {
  R: 0, I: 0, A: 0, S: 0, E: 0, C: 0,
  Openness: 0, Conscientiousness: 0, Extraversion: 0, Agreeableness: 0, Neuroticism: 0,
  Autonomy: 0, Stability: 0, Growth: 0, Impact: 0
};

function clampLikert(value: number): number {
  if (!Number.isFinite(value)) return 3;
  if (value < 1) return 1;
  if (value > 5) return 5;
  return value;
}

function likertTo100(avg: number): number {
  // avg in [1..5] -> [0..100]
  const v = Math.max(1, Math.min(5, avg));
  return Math.round(((v - 1) / 4) * 100);
}

export function calculateScores(questions: Question[], answers: Record<string, number>): Scores {
  const sums: Record<keyof Scores, number> = { ...initialScores };
  const counts: Record<keyof Scores, number> = Object.keys(initialScores).reduce((acc, k) => {
    acc[k as keyof Scores] = 0;
    return acc;
  }, {} as Record<keyof Scores, number>);

  for (const q of questions) {
    const raw = answers[q.id];
    if (raw === undefined) continue;
    let v = clampLikert(raw);
    if (q.reverse) v = 6 - v;

    const dim = q.dimension as keyof Scores;
    // Only score dimensions we actually expose.
    if (dim in sums) {
      sums[dim] += v;
      counts[dim] += 1;
    }
  }

  const out: Scores = { ...initialScores };
  (Object.keys(out) as (keyof Scores)[]).forEach((dim) => {
    const c = counts[dim];
    if (c <= 0) {
      out[dim] = 0;
      return;
    }
    const avg = sums[dim] / c;
    out[dim] = likertTo100(avg);
  });

  return out;
}

export function findJobMatches(userScores: Scores, jobs: Job[]): (Job & { matchScore: number })[] {
  return jobs.map(job => {
    let score = 0;

    // RIASEC match in normalized 0-100 space.
    (['R', 'I', 'A', 'S', 'E', 'C'] as const).forEach(dim => {
      const userVal = userScores[dim] ?? 0;
      const jobLikert = job.profile[dim] ?? 3;
      const jobVal = likertTo100(jobLikert);
      const diff = Math.abs(userVal - jobVal); // 0..100
      score += (100 - diff);
    });

    return { ...job, matchScore: Math.round(score / 6) };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
