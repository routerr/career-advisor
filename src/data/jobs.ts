
export interface Job {
  id: string;
  title: { en: string; zh: string };
  salaryRange: { min: number; max: number; currency: string };
  description: { en: string; zh: string };
  profile: {
    R: number; I: number; A: number; S: number; E: number; C: number;
    Openness?: number; Conscientiousness?: number; Extraversion?: number; Agreeableness?: number; Neuroticism?: number;
  }; 
}

export const jobs: Job[] = [
  {
    id: 'software-engineer',
    title: { en: "Software Engineer", zh: "軟體工程師" },
    salaryRange: { min: 80000, max: 150000, currency: "USD" },
    description: { en: "Design and build software applications.", zh: "設計和構建軟體應用程式。" },
    profile: { R: 4, I: 5, A: 3, S: 2, E: 2, C: 4, Openness: 4, Conscientiousness: 4 }
  },
  {
    id: 'data-scientist',
    title: { en: "Data Scientist", zh: "資料科學家" },
    salaryRange: { min: 90000, max: 160000, currency: "USD" },
    description: { en: "Analyze complex data to help make decisions.", zh: "分析複雜數據以協助決策。" },
    profile: { R: 2, I: 5, A: 2, S: 2, E: 3, C: 4, Openness: 4, Conscientiousness: 4 }
  },
  {
    id: 'graphic-designer',
    title: { en: "Graphic Designer", zh: "平面設計師" },
    salaryRange: { min: 45000, max: 85000, currency: "USD" },
    description: { en: "Create visual concepts to communicate ideas.", zh: "創造視覺概念以傳達想法。" },
    profile: { R: 3, I: 2, A: 5, S: 3, E: 2, C: 2, Openness: 5 }
  },
  {
    id: 'project-manager',
    title: { en: "Project Manager", zh: "專案經理" },
    salaryRange: { min: 70000, max: 130000, currency: "USD" },
    description: { en: "Plan and oversee projects to ensure they are completed on time.", zh: "規劃並監督專案，確保按時完成。" },
    profile: { R: 2, I: 3, A: 2, S: 4, E: 5, C: 4, Conscientiousness: 5, Extraversion: 4 }
  },
  {
    id: 'registered-nurse',
    title: { en: "Registered Nurse", zh: "註冊護士" },
    salaryRange: { min: 60000, max: 100000, currency: "USD" },
    description: { en: "Provide and coordinate patient care.", zh: "提供並協調病人護理。" },
    profile: { R: 3, I: 3, A: 2, S: 5, E: 3, C: 4, Agreeableness: 5, Conscientiousness: 4 }
  },
  {
    id: 'marketing-manager',
    title: { en: "Marketing Manager", zh: "行銷經理" },
    salaryRange: { min: 65000, max: 120000, currency: "USD" },
    description: { en: "Plan programs to generate interest in products or services.", zh: "規劃方案以引起對產品或服務的興趣。" },
    profile: { R: 2, I: 3, A: 4, S: 4, E: 5, C: 3, Openness: 4, Extraversion: 5 }
  },
  {
    id: 'accountant',
    title: { en: "Accountant", zh: "會計師" },
    salaryRange: { min: 55000, max: 95000, currency: "USD" },
    description: { en: "Prepare and examine financial records.", zh: "準備並檢查財務記錄。" },
    profile: { R: 2, I: 3, A: 1, S: 2, E: 3, C: 5, Conscientiousness: 5 }
  },
  {
    id: 'civil-engineer',
    title: { en: "Civil Engineer", zh: "土木工程師" },
    salaryRange: { min: 70000, max: 125000, currency: "USD" },
    description: { en: "Design and supervise infrastructure projects.", zh: "設計並監督基礎設施專案。" },
    profile: { R: 5, I: 4, A: 2, S: 2, E: 3, C: 4, Conscientiousness: 4 }
  }
];
