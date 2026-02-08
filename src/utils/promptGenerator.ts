import type { Scores } from './scoring';
import type { Job } from '../data/jobs';

export const generateChatGPTPrompt = (scores: Scores, matchedJobs: (Job & { matchScore: number })[], lang: 'en' | 'zh'): string => {
  // Include ALL traits, sorted by score
  const riasecScores = (['R', 'I', 'A', 'S', 'E', 'C'] as const)
    .map((k) => `${k}: ${scores[k]}/100`)
    .join(', ');

  const bigFiveScores = [
    `O(Openness): ${scores.Openness}/100`,
    `C(Conscientiousness): ${scores.Conscientiousness}/100`,
    `E(Extraversion): ${scores.Extraversion}/100`,
    `A(Agreeableness): ${scores.Agreeableness}/100`,
    `N(Neuroticism): ${scores.Neuroticism}/100`,
  ].join(', ');

  const valuesScores = [
    `${lang === 'en' ? 'Autonomy' : '自主'}: ${scores.Autonomy}/100`,
    `${lang === 'en' ? 'Stability' : '穩定'}: ${scores.Stability}/100`,
    `${lang === 'en' ? 'Growth' : '成長'}: ${scores.Growth}/100`,
    `${lang === 'en' ? 'Impact' : '影響力'}: ${scores.Impact}/100`,
  ].join(', ');

  // MBTI-like code derived from Big Five (approximate, not MBTI).
  const mbtiLike = (() => {
    const ei = scores.Extraversion >= 50 ? 'E' : 'I';
    const ns = scores.Openness >= 50 ? 'N' : 'S';
    const tf = scores.Agreeableness >= 50 ? 'F' : 'T';
    const jp = scores.Conscientiousness >= 50 ? 'J' : 'P';
    return `${ei}${ns}${tf}${jp}`;
  })();

  // Top 3 Jobs with Match %
  const topJobs = matchedJobs.slice(0, 3)
    .map((j: Job & { matchScore: number }) => `${j.title[lang]} (Match: ${j.matchScore}%)`)
    .join('; ');

  const promptZh = `
我剛剛完成了一個職涯適性測驗（包含 Holland RIASEC 興趣向度 + Big Five 人格特質 + 工作價值觀）。

【我的測驗結果】
1. **RIASEC（0-100）**：${riasecScores}
2. **Big Five（0-100）**：${bigFiveScores}
3. **工作價值觀（0-100）**：${valuesScores}
4. **MBTI-like（推估、非 MBTI）**：${mbtiLike}
5. **推薦的前三名適合職位**：${topJobs}

【你扮演的角色】
你是我的「專業職涯顧問」。請先問問題、再給建議，避免直接猜測。

【第一步：請先問我 8 個澄清問題（逐題問，等我回答後再繼續）】
請用條列式，問題要精準、可回答，必要時提供選項（例如 A/B/C）。建議涵蓋：
1) 目前身分與年資（學生/轉職/在職；年資範圍）
2) 最高學歷與科系
3) 目前/過去做過的工作或專案（2-3 個）
4) 想避開的工作型態（高社交/高銷售/高度例行/高度不確定等）
5) 偏好產業與公司規模（新創/中型/大型；產業）
6) 地點與工作型態（台灣/海外；遠端/混合/到辦）
7) 目標薪資範圍與時間表（1-3 個月/3-6 個月/6-12 個月）
8) 你的語言能力與工作語言偏好（中/英）

【第二步：在我回答後，請輸出一份可執行的深度建議（用清楚的章節）】
至少包含：
1) 這三個職位為何匹配我的 RIASEC 興趣向度 + Big Five 特質 + 價值觀，以及可能的風險與補法
2) 角色拆解：每天在做什麼、需要的核心能力、常見門檻
3) 技能差距分析與學習路徑：2 週 / 1 個月 / 3 個月（每段 3-5 個具體行動）
4) 求職策略：履歷關鍵字清單、可直接套用的履歷 bullet 模板（3-6 條）、作品集/專案點子（2-3 個）
5) 面試準備：10 個高機率問題 + STAR 作答框架範例（至少 2 題）
6) 30 天行動清單（每日/每週節奏）

【輸出風格】
專業、具體、鼓勵；避免空泛建議；若資訊不足，先追問再下結論。
`.trim();

  const promptEn = `
I have just completed a career assessment (Holland RIASEC interests + Big Five personality + work values).

【My Profile】
1. **RIASEC (0-100)**: ${riasecScores}
2. **Big Five (0-100)**: ${bigFiveScores}
3. **Work Values (0-100)**: ${valuesScores}
4. **MBTI-like (estimated, not MBTI)**: ${mbtiLike}
5. **Top 3 Recommended Roles**: ${topJobs}

【Your Role】
You are my **Professional Career Advisor**. Ask questions first, then give recommendations. Do not guess.

【Step 1: Ask me 8 clarifying questions first (ask one by one, wait for my answer each time)】
Use concise bullets and include multiple-choice options when helpful. Cover:
1) Current situation and years of experience (student/career switcher/employed; range)
2) Education background
3) 2-3 past projects/work highlights
4) Work styles I want to avoid (high social/sales-heavy/routine/chaotic, etc.)
5) Industry and company-size preferences
6) Location and work mode (onsite/hybrid/remote)
7) Target salary range and timeline (1-3 / 3-6 / 6-12 months)
8) Language proficiency and preferred work language

【Step 2: After I answer, produce a deep, actionable plan (clear sections)】
Include at least:
1) Fit analysis for the 3 roles: how they match my RIASEC interests + Big Five traits + values, plus risks and mitigations
2) Role breakdown: day-to-day, core skills, typical entry requirements
3) Skill-gap plan: 2 weeks / 1 month / 3 months (3-5 concrete actions each)
4) Job-search strategy: keyword list, 3-6 resume bullet templates, 2-3 portfolio/project ideas
5) Interview prep: 10 likely questions + STAR frameworks (at least 2 fully sketched examples)
6) A 30-day action checklist (weekly cadence)

【Style】
Structured, specific, supportive; avoid generic advice; ask follow-ups if needed.
`.trim();

  return lang === 'zh' ? promptZh : promptEn;
};

// Backward-compatible name (existing callers).
export const generateGeminiPrompt = generateChatGPTPrompt;
