export interface SkillsInterface {
  skill_id: number;
  skill: {
    skill_name: string;
    skill_percentage: number;
  };
  gg_id: number;
  experience_id?: number;
  certifications: string[];
}
