import { SkillsInterface } from "./skillsInterface";

export interface ExperienceInterface {
  experience_id: number;
  gg_id: number;
  type?: string;
  name?: string;
  description?: string;
  tools: string[];
  project_skills: string[];
  project_pictures: string[];
  link?: string;
  skills?: SkillsInterface[];
}
