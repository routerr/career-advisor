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
  { id: 'riasec_r_01', kind: 'riasec', dimension: 'R', text: { en: 'I enjoy building or fixing things with my hands.', zh: '我喜歡親手組裝、製作或修理東西。' } },
  { id: 'riasec_r_02', kind: 'riasec', dimension: 'R', text: { en: 'I would like a job that involves tools, machines, or equipment.', zh: '我希望工作會常常用到工具、機械或設備。' } },
  { id: 'riasec_r_03', kind: 'riasec', dimension: 'R', text: { en: 'I enjoy working outdoors or in physical environments.', zh: '我喜歡戶外工作，或做需要動起來的工作。' } },
  { id: 'riasec_r_04', kind: 'riasec', dimension: 'R', text: { en: 'I like seeing immediate, tangible results from my work.', zh: '我喜歡工作做完就能看到實際成果。' } },
  { id: 'riasec_r_05', kind: 'riasec', dimension: 'R', text: { en: 'I enjoy troubleshooting practical problems (e.g., devices or hardware).', zh: '我喜歡處理實務問題（例如排除設備或硬體故障）。' } },
  { id: 'riasec_r_06', kind: 'riasec', dimension: 'R', text: { en: 'I prefer learning by doing rather than starting with theory.', zh: '比起一開始先讀理論，我更喜歡邊做邊學。' } },

  { id: 'riasec_i_01', kind: 'riasec', dimension: 'I', text: { en: 'I enjoy analyzing data to find patterns.', zh: '我喜歡分析資料，找出其中的規律。' } },
  { id: 'riasec_i_02', kind: 'riasec', dimension: 'I', text: { en: 'I like solving complex problems that require deep thinking.', zh: '我喜歡解決需要深入思考的複雜問題。' } },
  { id: 'riasec_i_03', kind: 'riasec', dimension: 'I', text: { en: 'I enjoy learning how systems work and why things happen.', zh: '我喜歡弄清楚系統怎麼運作，以及事情為什麼會發生。' } },
  { id: 'riasec_i_04', kind: 'riasec', dimension: 'I', text: { en: 'I enjoy experiments, testing, or research.', zh: '我喜歡做實驗、測試或研究。' } },
  { id: 'riasec_i_05', kind: 'riasec', dimension: 'I', text: { en: 'I prefer work that values evidence and accuracy.', zh: '我偏好重視證據與精準的工作。' } },
  { id: 'riasec_i_06', kind: 'riasec', dimension: 'I', text: { en: 'I like reading about new discoveries or technologies.', zh: '我喜歡閱讀新發現或新科技相關的內容。' } },

  { id: 'riasec_a_01', kind: 'riasec', dimension: 'A', text: { en: 'I enjoy creating original ideas or designs.', zh: '我喜歡想出新點子或做設計。' } },
  { id: 'riasec_a_02', kind: 'riasec', dimension: 'A', text: { en: 'I enjoy writing, drawing, music, or visual expression.', zh: '我喜歡用寫作、繪畫、音樂或視覺作品來表達自己。' } },
  { id: 'riasec_a_03', kind: 'riasec', dimension: 'A', text: { en: 'I prefer work with creative freedom.', zh: '我喜歡工作能讓我自由發揮創意。' } },
  { id: 'riasec_a_04', kind: 'riasec', dimension: 'A', text: { en: 'I like exploring different styles and perspectives.', zh: '我喜歡接觸不同的風格和觀點。' } },
  { id: 'riasec_a_05', kind: 'riasec', dimension: 'A', text: { en: 'I enjoy improvising and experimenting with new approaches.', zh: '我喜歡嘗試新的做法，有時也會即興發揮。' } },
  { id: 'riasec_a_06', kind: 'riasec', dimension: 'A', text: { en: 'I value aesthetics and storytelling in work.', zh: '我在意作品的美感與故事性。' } },

  { id: 'riasec_s_01', kind: 'riasec', dimension: 'S', text: { en: 'I enjoy helping people learn or grow.', zh: '我喜歡幫助別人學習或成長。' } },
  { id: 'riasec_s_02', kind: 'riasec', dimension: 'S', text: { en: "I enjoy listening and understanding other people's needs.", zh: '我喜歡聽人說，也願意了解對方的需求。' } },
  { id: 'riasec_s_03', kind: 'riasec', dimension: 'S', text: { en: 'I would enjoy a role that involves teaching, coaching, or counseling.', zh: '我會喜歡教學、帶人、教練或諮詢類的工作。' } },
  { id: 'riasec_s_04', kind: 'riasec', dimension: 'S', text: { en: 'I prefer collaborating with others over working alone.', zh: '比起自己做，我更喜歡和別人一起合作。' } },
  { id: 'riasec_s_05', kind: 'riasec', dimension: 'S', text: { en: "I care about improving other people's well-being.", zh: '我在意能不能讓別人的生活變得更好。' } },
  { id: 'riasec_s_06', kind: 'riasec', dimension: 'S', text: { en: 'I enjoy resolving conflicts and supporting teamwork.', zh: '我喜歡協調衝突，幫助團隊更順利合作。' } },

  { id: 'riasec_e_01', kind: 'riasec', dimension: 'E', text: { en: 'I enjoy persuading others or presenting ideas.', zh: '我喜歡說服他人，或用清楚的方式把想法講出來。' } },
  { id: 'riasec_e_02', kind: 'riasec', dimension: 'E', text: { en: 'I like taking initiative and making decisions.', zh: '我喜歡主動出手，並做決定。' } },
  { id: 'riasec_e_03', kind: 'riasec', dimension: 'E', text: { en: 'I enjoy negotiating, selling, or influencing outcomes.', zh: '我喜歡談判、銷售，或影響事情的結果。' } },
  { id: 'riasec_e_04', kind: 'riasec', dimension: 'E', text: { en: 'I like setting ambitious goals and driving results.', zh: '我喜歡訂目標，並推進結果。' } },
  { id: 'riasec_e_05', kind: 'riasec', dimension: 'E', text: { en: 'I would enjoy building a business or owning a project end-to-end.', zh: '我會喜歡從零到一負責一個專案，甚至創業。' } },
  { id: 'riasec_e_06', kind: 'riasec', dimension: 'E', text: { en: 'I enjoy environments where performance is clearly measured.', zh: '我喜歡成果能被清楚衡量的環境。' } },

  { id: 'riasec_c_01', kind: 'riasec', dimension: 'C', text: { en: 'I enjoy organizing information and keeping things orderly.', zh: '我喜歡整理資訊，讓事情更有條理。' } },
  { id: 'riasec_c_02', kind: 'riasec', dimension: 'C', text: { en: 'I like following clear procedures or standards.', zh: '我喜歡照著清楚的流程或規範做事。' } },
  { id: 'riasec_c_03', kind: 'riasec', dimension: 'C', text: { en: 'I prefer tasks that require careful attention to detail.', zh: '我喜歡需要仔細核對細節的任務。' } },
  { id: 'riasec_c_04', kind: 'riasec', dimension: 'C', text: { en: 'I feel satisfied when errors are reduced and systems run smoothly.', zh: '當錯誤變少、流程更順時，我會很有成就感。' } },
  { id: 'riasec_c_05', kind: 'riasec', dimension: 'C', text: { en: 'I like planning schedules, checklists, or documentation.', zh: '我喜歡用行程表、清單或文件把事情規劃好。' } },
  { id: 'riasec_c_06', kind: 'riasec', dimension: 'C', text: { en: 'I prefer stable, predictable work over frequent changes.', zh: '比起常常變動，我更喜歡穩定、可預期的工作。' } },

  // -----------------------------------------
  // Big Five (25 items, IPIP public-domain set)
  // -----------------------------------------
  // Openness
  { id: 'big5_o_01', kind: 'big5', dimension: 'Openness', text: { en: 'I have a vivid imagination.', zh: '我的想像力很豐富。' } },
  { id: 'big5_o_02', kind: 'big5', dimension: 'Openness', text: { en: 'I am full of ideas.', zh: '我常常冒出很多點子。' } },
  { id: 'big5_o_03', kind: 'big5', dimension: 'Openness', text: { en: 'I have a rich vocabulary.', zh: '我的用字遣詞很豐富。' } },
  { id: 'big5_o_04', kind: 'big5', dimension: 'Openness', reverse: true, text: { en: 'I am not interested in abstract ideas.', zh: '我對抽象概念不太有興趣。' } },
  { id: 'big5_o_05', kind: 'big5', dimension: 'Openness', reverse: true, text: { en: 'I have difficulty understanding abstract ideas.', zh: '我常覺得抽象概念很難理解。' } },

  // Conscientiousness
  { id: 'big5_c_01', kind: 'big5', dimension: 'Conscientiousness', text: { en: 'I am always prepared.', zh: '我通常會事先準備好。' } },
  { id: 'big5_c_02', kind: 'big5', dimension: 'Conscientiousness', text: { en: 'I pay attention to details.', zh: '我很注意細節。' } },
  { id: 'big5_c_03', kind: 'big5', dimension: 'Conscientiousness', text: { en: 'I follow a schedule.', zh: '我習慣照著計畫或行程來做事。' } },
  { id: 'big5_c_04', kind: 'big5', dimension: 'Conscientiousness', reverse: true, text: { en: 'I leave my belongings around.', zh: '我常把東西放著不收。' } },
  { id: 'big5_c_05', kind: 'big5', dimension: 'Conscientiousness', reverse: true, text: { en: 'I make a mess of things.', zh: '我常把事情弄得有點亂。' } },

  // Extraversion
  { id: 'big5_e_01', kind: 'big5', dimension: 'Extraversion', text: { en: 'I am the life of the party.', zh: '在聚會中，我常是帶氣氛的人。' } },
  { id: 'big5_e_02', kind: 'big5', dimension: 'Extraversion', text: { en: 'I feel comfortable around people.', zh: '跟人在一起時，我覺得很自在。' } },
  { id: 'big5_e_03', kind: 'big5', dimension: 'Extraversion', text: { en: 'I start conversations.', zh: '我常主動開話題。' } },
  { id: 'big5_e_04', kind: 'big5', dimension: 'Extraversion', reverse: true, text: { en: "I don't talk a lot.", zh: '我不太多話。' } },
  { id: 'big5_e_05', kind: 'big5', dimension: 'Extraversion', reverse: true, text: { en: 'I keep in the background.', zh: '我通常比較低調，不太出風頭。' } },

  // Agreeableness
  { id: 'big5_a_01', kind: 'big5', dimension: 'Agreeableness', text: { en: "I sympathize with others' feelings.", zh: '我能同理別人的感受。' } },
  { id: 'big5_a_02', kind: 'big5', dimension: 'Agreeableness', text: { en: 'I take time out for others.', zh: '我願意花時間幫忙別人。' } },
  { id: 'big5_a_03', kind: 'big5', dimension: 'Agreeableness', text: { en: "I feel others' emotions.", zh: '我很容易感受到別人的情緒。' } },
  { id: 'big5_a_04', kind: 'big5', dimension: 'Agreeableness', reverse: true, text: { en: "I am not interested in other people's problems.", zh: '我對別人的問題不太關心。' } },
  { id: 'big5_a_05', kind: 'big5', dimension: 'Agreeableness', reverse: true, text: { en: 'I insult people.', zh: '我有時會說些難聽的話。' } },

  // Neuroticism
  { id: 'big5_n_01', kind: 'big5', dimension: 'Neuroticism', text: { en: 'I get stressed out easily.', zh: '我很容易感到壓力。' } },
  { id: 'big5_n_02', kind: 'big5', dimension: 'Neuroticism', text: { en: 'I worry about things.', zh: '我常常會擔心事情。' } },
  { id: 'big5_n_03', kind: 'big5', dimension: 'Neuroticism', text: { en: 'I get irritated easily.', zh: '我很容易覺得煩躁。' } },
  { id: 'big5_n_04', kind: 'big5', dimension: 'Neuroticism', reverse: true, text: { en: 'I am relaxed most of the time.', zh: '我大多時候都很放鬆。' } },
  { id: 'big5_n_05', kind: 'big5', dimension: 'Neuroticism', reverse: true, text: { en: 'I seldom feel blue.', zh: '我很少覺得心情低落。' } },

  // ----------------------------------------
  // Work Values (12 items, 3 per value scale)
  // ----------------------------------------
  // Autonomy
  { id: 'values_aut_01', kind: 'values', dimension: 'Autonomy', text: { en: 'I value having control over how I do my work.', zh: '我重視能自己決定怎麼做工作。' } },
  { id: 'values_aut_02', kind: 'values', dimension: 'Autonomy', text: { en: 'I prefer roles with flexibility in time or location when possible.', zh: '如果可以，我希望工作時間或地點更有彈性。' } },
  { id: 'values_aut_03', kind: 'values', dimension: 'Autonomy', text: { en: 'I want room to make decisions without constant approval.', zh: '我希望做決定時，不需要一直請示。' } },

  // Stability
  { id: 'values_sta_01', kind: 'values', dimension: 'Stability', text: { en: 'I prefer stable income and predictable responsibilities.', zh: '我重視穩定收入與明確的工作內容。' } },
  { id: 'values_sta_02', kind: 'values', dimension: 'Stability', text: { en: 'I value clear rules, roles, and long-term employment security.', zh: '我重視清楚的規則、分工和長期的工作保障。' } },
  { id: 'values_sta_03', kind: 'values', dimension: 'Stability', text: { en: 'I prefer lower-risk work even if growth is slower.', zh: '即使成長慢一點，我也比較偏好低風險的工作。' } },

  // Growth
  { id: 'values_gro_01', kind: 'values', dimension: 'Growth', text: { en: 'I want work that pushes me to learn and improve quickly.', zh: '我希望工作能推著我快速學習與進步。' } },
  { id: 'values_gro_02', kind: 'values', dimension: 'Growth', text: { en: 'I enjoy tackling difficult challenges to build mastery.', zh: '我喜歡挑戰難題來累積實力。' } },
  { id: 'values_gro_03', kind: 'values', dimension: 'Growth', text: { en: 'I prefer environments with frequent feedback and mentorship.', zh: '我喜歡有前輩帶、也常有回饋的環境。' } },

  // Impact
  { id: 'values_imp_01', kind: 'values', dimension: 'Impact', text: { en: 'I want my work to meaningfully help others or society.', zh: '我希望我的工作能對他人或社會有實際幫助。' } },
  { id: 'values_imp_02', kind: 'values', dimension: 'Impact', text: { en: 'I value working on products or services I can feel proud of.', zh: '我重視做自己會感到驕傲的產品或服務。' } },
  { id: 'values_imp_03', kind: 'values', dimension: 'Impact', text: { en: 'I prefer roles where I can see the real-world impact of my work.', zh: '我喜歡能看見成果對現實世界產生影響的角色。' } },
];
