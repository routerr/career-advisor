export type AssessmentKind = 'riasec' | 'big5' | 'values';

export type AssessmentDimension =
  // Holland RIASEC interests
  | 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
  // Big Five (OCEAN)
  | 'Openness' | 'Conscientiousness' | 'Extraversion' | 'Agreeableness' | 'Neuroticism'
  // Work values (career decision support)
  | 'Autonomy' | 'Stability' | 'Growth' | 'Impact';

export interface Question {
  id: string;
  kind: AssessmentKind;
  dimension: AssessmentDimension;
  // Reverse-keyed item for Likert scoring (1-5).
  reverse?: boolean;
  text: { en: string; zh: string };
}

// Likert 1-5 is rendered by UI globally:
// 1=Strongly disagree ... 5=Strongly agree.
export const questions: Question[] = [
  // -----------------------------
  // RIASEC (36 items, 6 per scale)
  // -----------------------------
  { id: 'riasec_r_01', kind: 'riasec', dimension: 'R', text: { en: 'I enjoy building or fixing things with my hands.', zh: '我喜歡動手組裝或修理東西。' } },
  { id: 'riasec_r_02', kind: 'riasec', dimension: 'R', text: { en: 'I would like a job that involves tools, machines, or equipment.', zh: '我希望工作會接觸工具、機械或設備。' } },
  { id: 'riasec_r_03', kind: 'riasec', dimension: 'R', text: { en: 'I enjoy working outdoors or in physical environments.', zh: '我喜歡戶外或偏體力的工作環境。' } },
  { id: 'riasec_r_04', kind: 'riasec', dimension: 'R', text: { en: 'I like seeing immediate, tangible results from my work.', zh: '我喜歡工作成果立刻、具體可見。' } },
  { id: 'riasec_r_05', kind: 'riasec', dimension: 'R', text: { en: 'I enjoy troubleshooting practical problems (e.g., devices or hardware).', zh: '我喜歡排除實務問題（例如設備或硬體故障）。' } },
  { id: 'riasec_r_06', kind: 'riasec', dimension: 'R', text: { en: 'I prefer learning by doing rather than starting with theory.', zh: '我比較喜歡動手做來學，而不是先讀理論。' } },

  { id: 'riasec_i_01', kind: 'riasec', dimension: 'I', text: { en: 'I enjoy analyzing data to find patterns.', zh: '我喜歡分析資料並找出規律。' } },
  { id: 'riasec_i_02', kind: 'riasec', dimension: 'I', text: { en: 'I like solving complex problems that require deep thinking.', zh: '我喜歡需要深入思考的複雜問題。' } },
  { id: 'riasec_i_03', kind: 'riasec', dimension: 'I', text: { en: 'I enjoy learning how systems work and why things happen.', zh: '我喜歡研究系統如何運作，以及事情為何會發生。' } },
  { id: 'riasec_i_04', kind: 'riasec', dimension: 'I', text: { en: 'I enjoy experiments, testing, or research.', zh: '我喜歡做實驗、測試或研究。' } },
  { id: 'riasec_i_05', kind: 'riasec', dimension: 'I', text: { en: 'I prefer work that values evidence and accuracy.', zh: '我偏好重視證據與精準的工作。' } },
  { id: 'riasec_i_06', kind: 'riasec', dimension: 'I', text: { en: 'I like reading about new discoveries or technologies.', zh: '我喜歡閱讀新發現或新科技。' } },

  { id: 'riasec_a_01', kind: 'riasec', dimension: 'A', text: { en: 'I enjoy creating original ideas or designs.', zh: '我喜歡產生原創想法或設計。' } },
  { id: 'riasec_a_02', kind: 'riasec', dimension: 'A', text: { en: 'I enjoy writing, drawing, music, or visual expression.', zh: '我喜歡寫作、繪畫、音樂或視覺表達。' } },
  { id: 'riasec_a_03', kind: 'riasec', dimension: 'A', text: { en: 'I prefer work with creative freedom.', zh: '我偏好有創作自由的工作。' } },
  { id: 'riasec_a_04', kind: 'riasec', dimension: 'A', text: { en: 'I like exploring different styles and perspectives.', zh: '我喜歡探索不同風格與觀點。' } },
  { id: 'riasec_a_05', kind: 'riasec', dimension: 'A', text: { en: 'I enjoy improvising and experimenting with new approaches.', zh: '我喜歡即興發揮並嘗試新作法。' } },
  { id: 'riasec_a_06', kind: 'riasec', dimension: 'A', text: { en: 'I value aesthetics and storytelling in work.', zh: '我重視工作中的美感與敘事。' } },

  { id: 'riasec_s_01', kind: 'riasec', dimension: 'S', text: { en: 'I enjoy helping people learn or grow.', zh: '我喜歡協助他人成長或學習。' } },
  { id: 'riasec_s_02', kind: 'riasec', dimension: 'S', text: { en: "I enjoy listening and understanding other people's needs.", zh: '我喜歡傾聽並理解他人的需求。' } },
  { id: 'riasec_s_03', kind: 'riasec', dimension: 'S', text: { en: 'I would enjoy a role that involves teaching, coaching, or counseling.', zh: '我會喜歡教學、教練或諮詢相關的角色。' } },
  { id: 'riasec_s_04', kind: 'riasec', dimension: 'S', text: { en: 'I prefer collaborating with others over working alone.', zh: '我偏好與他人合作勝過獨自工作。' } },
  { id: 'riasec_s_05', kind: 'riasec', dimension: 'S', text: { en: "I care about improving other people's well-being.", zh: '我在意提升他人的福祉。' } },
  { id: 'riasec_s_06', kind: 'riasec', dimension: 'S', text: { en: 'I enjoy resolving conflicts and supporting teamwork.', zh: '我喜歡協調衝突並支持團隊合作。' } },

  { id: 'riasec_e_01', kind: 'riasec', dimension: 'E', text: { en: 'I enjoy persuading others or presenting ideas.', zh: '我喜歡說服他人或呈現想法。' } },
  { id: 'riasec_e_02', kind: 'riasec', dimension: 'E', text: { en: 'I like taking initiative and making decisions.', zh: '我喜歡主動帶頭並做決策。' } },
  { id: 'riasec_e_03', kind: 'riasec', dimension: 'E', text: { en: 'I enjoy negotiating, selling, or influencing outcomes.', zh: '我喜歡談判、銷售或影響結果。' } },
  { id: 'riasec_e_04', kind: 'riasec', dimension: 'E', text: { en: 'I like setting ambitious goals and driving results.', zh: '我喜歡設定高目標並推動成果。' } },
  { id: 'riasec_e_05', kind: 'riasec', dimension: 'E', text: { en: 'I would enjoy building a business or owning a project end-to-end.', zh: '我會喜歡從零到一打造事業，或負責完整專案。' } },
  { id: 'riasec_e_06', kind: 'riasec', dimension: 'E', text: { en: 'I enjoy environments where performance is clearly measured.', zh: '我喜歡成效可被清楚衡量的環境。' } },

  { id: 'riasec_c_01', kind: 'riasec', dimension: 'C', text: { en: 'I enjoy organizing information and keeping things orderly.', zh: '我喜歡整理資訊並讓事情井然有序。' } },
  { id: 'riasec_c_02', kind: 'riasec', dimension: 'C', text: { en: 'I like following clear procedures or standards.', zh: '我喜歡遵循清楚的流程或標準。' } },
  { id: 'riasec_c_03', kind: 'riasec', dimension: 'C', text: { en: 'I prefer tasks that require careful attention to detail.', zh: '我偏好需要仔細注重細節的任務。' } },
  { id: 'riasec_c_04', kind: 'riasec', dimension: 'C', text: { en: 'I feel satisfied when errors are reduced and systems run smoothly.', zh: '當錯誤降低、系統運作順暢時，我會很有成就感。' } },
  { id: 'riasec_c_05', kind: 'riasec', dimension: 'C', text: { en: 'I like planning schedules, checklists, or documentation.', zh: '我喜歡規劃行程、清單或文件。' } },
  { id: 'riasec_c_06', kind: 'riasec', dimension: 'C', text: { en: 'I prefer stable, predictable work over frequent changes.', zh: '我偏好穩定可預測的工作，不喜歡頻繁變動。' } },

  // -----------------------------------------
  // Big Five (25 items, IPIP public-domain set)
  // -----------------------------------------
  // Openness
  { id: 'big5_o_01', kind: 'big5', dimension: 'Openness', text: { en: 'I have a vivid imagination.', zh: '我有很生動的想像力。' } },
  { id: 'big5_o_02', kind: 'big5', dimension: 'Openness', text: { en: 'I am full of ideas.', zh: '我充滿點子。' } },
  { id: 'big5_o_03', kind: 'big5', dimension: 'Openness', text: { en: 'I have a rich vocabulary.', zh: '我的詞彙量很豐富。' } },
  { id: 'big5_o_04', kind: 'big5', dimension: 'Openness', reverse: true, text: { en: 'I am not interested in abstract ideas.', zh: '我對抽象概念不太感興趣。' } },
  { id: 'big5_o_05', kind: 'big5', dimension: 'Openness', reverse: true, text: { en: 'I have difficulty understanding abstract ideas.', zh: '我很難理解抽象的想法。' } },

  // Conscientiousness
  { id: 'big5_c_01', kind: 'big5', dimension: 'Conscientiousness', text: { en: 'I am always prepared.', zh: '我總是做足準備。' } },
  { id: 'big5_c_02', kind: 'big5', dimension: 'Conscientiousness', text: { en: 'I pay attention to details.', zh: '我很注意細節。' } },
  { id: 'big5_c_03', kind: 'big5', dimension: 'Conscientiousness', text: { en: 'I follow a schedule.', zh: '我會依照行程或計畫表行事。' } },
  { id: 'big5_c_04', kind: 'big5', dimension: 'Conscientiousness', reverse: true, text: { en: 'I leave my belongings around.', zh: '我常把東西亂放。' } },
  { id: 'big5_c_05', kind: 'big5', dimension: 'Conscientiousness', reverse: true, text: { en: 'I make a mess of things.', zh: '我常把事情弄得一團亂。' } },

  // Extraversion
  { id: 'big5_e_01', kind: 'big5', dimension: 'Extraversion', text: { en: 'I am the life of the party.', zh: '我常是聚會中的焦點。' } },
  { id: 'big5_e_02', kind: 'big5', dimension: 'Extraversion', text: { en: 'I feel comfortable around people.', zh: '我在眾人之中會感到自在。' } },
  { id: 'big5_e_03', kind: 'big5', dimension: 'Extraversion', text: { en: 'I start conversations.', zh: '我會主動開啟對話。' } },
  { id: 'big5_e_04', kind: 'big5', dimension: 'Extraversion', reverse: true, text: { en: "I don't talk a lot.", zh: '我不太愛說話。' } },
  { id: 'big5_e_05', kind: 'big5', dimension: 'Extraversion', reverse: true, text: { en: 'I keep in the background.', zh: '我通常會待在一旁，不太出風頭。' } },

  // Agreeableness
  { id: 'big5_a_01', kind: 'big5', dimension: 'Agreeableness', text: { en: "I sympathize with others' feelings.", zh: '我會同理別人的感受。' } },
  { id: 'big5_a_02', kind: 'big5', dimension: 'Agreeableness', text: { en: 'I take time out for others.', zh: '我願意撥時間幫助他人。' } },
  { id: 'big5_a_03', kind: 'big5', dimension: 'Agreeableness', text: { en: "I feel others' emotions.", zh: '我能感受到他人的情緒。' } },
  { id: 'big5_a_04', kind: 'big5', dimension: 'Agreeableness', reverse: true, text: { en: "I am not interested in other people's problems.", zh: '我對別人的問題不太感興趣。' } },
  { id: 'big5_a_05', kind: 'big5', dimension: 'Agreeableness', reverse: true, text: { en: 'I insult people.', zh: '我有時會對人講難聽的話。' } },

  // Neuroticism
  { id: 'big5_n_01', kind: 'big5', dimension: 'Neuroticism', text: { en: 'I get stressed out easily.', zh: '我很容易感到壓力。' } },
  { id: 'big5_n_02', kind: 'big5', dimension: 'Neuroticism', text: { en: 'I worry about things.', zh: '我常常擔心事情。' } },
  { id: 'big5_n_03', kind: 'big5', dimension: 'Neuroticism', text: { en: 'I get irritated easily.', zh: '我很容易煩躁或生氣。' } },
  { id: 'big5_n_04', kind: 'big5', dimension: 'Neuroticism', reverse: true, text: { en: 'I am relaxed most of the time.', zh: '我大多時候都很放鬆。' } },
  { id: 'big5_n_05', kind: 'big5', dimension: 'Neuroticism', reverse: true, text: { en: 'I seldom feel blue.', zh: '我很少感到憂鬱。' } },

  // ----------------------------------------
  // Work Values (12 items, 3 per value scale)
  // ----------------------------------------
  // Autonomy
  { id: 'values_aut_01', kind: 'values', dimension: 'Autonomy', text: { en: 'I value having control over how I do my work.', zh: '我重視能掌控自己的工作方式。' } },
  { id: 'values_aut_02', kind: 'values', dimension: 'Autonomy', text: { en: 'I prefer roles with flexibility in time or location when possible.', zh: '在可行範圍內，我偏好時間或地點更有彈性的工作。' } },
  { id: 'values_aut_03', kind: 'values', dimension: 'Autonomy', text: { en: 'I want room to make decisions without constant approval.', zh: '我希望能自行做決策，不需要事事請示。' } },

  // Stability
  { id: 'values_sta_01', kind: 'values', dimension: 'Stability', text: { en: 'I prefer stable income and predictable responsibilities.', zh: '我偏好穩定收入與可預期的職責。' } },
  { id: 'values_sta_02', kind: 'values', dimension: 'Stability', text: { en: 'I value clear rules, roles, and long-term employment security.', zh: '我重視清楚的規範、分工與長期的工作保障。' } },
  { id: 'values_sta_03', kind: 'values', dimension: 'Stability', text: { en: 'I prefer lower-risk work even if growth is slower.', zh: '即使成長較慢，我也偏好風險較低的工作。' } },

  // Growth
  { id: 'values_gro_01', kind: 'values', dimension: 'Growth', text: { en: 'I want work that pushes me to learn and improve quickly.', zh: '我希望工作能推著我快速學習與成長。' } },
  { id: 'values_gro_02', kind: 'values', dimension: 'Growth', text: { en: 'I enjoy tackling difficult challenges to build mastery.', zh: '我喜歡面對高難度挑戰來累積專業。' } },
  { id: 'values_gro_03', kind: 'values', dimension: 'Growth', text: { en: 'I prefer environments with frequent feedback and mentorship.', zh: '我偏好有明確回饋與指導的環境。' } },

  // Impact
  { id: 'values_imp_01', kind: 'values', dimension: 'Impact', text: { en: 'I want my work to meaningfully help others or society.', zh: '我希望我的工作能對他人或社會有實質幫助。' } },
  { id: 'values_imp_02', kind: 'values', dimension: 'Impact', text: { en: 'I value working on products or services I can feel proud of.', zh: '我重視能讓我引以為傲的產品或服務。' } },
  { id: 'values_imp_03', kind: 'values', dimension: 'Impact', text: { en: 'I prefer roles where I can see the real-world impact of my work.', zh: '我偏好能看見工作對現實世界影響的角色。' } },
];

