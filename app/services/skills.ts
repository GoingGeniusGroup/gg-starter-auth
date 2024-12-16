import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createSkills = async (data: Prisma.skillsCreateInput) => {
  try {
    const skills = await db.skills.create({
      data,
    });
    return skills;
  } catch (error) {
    console.error("Error in createSkills:", error);
    return null;
  }
};

export const getSkillsById = async (skill_id: string) => {
  try {
    const skills = await db.skills.findUnique({
      where: { skill_id },
    });
    return skills;
  } catch (error) {
    console.error("Error in getSkillsById:", error);
    return null;
  }
};

export const getSkillsByUserId = async (gg_id: string) => {
  try {
    const skills = await db.skills.findMany({
      where: { gg_id },
    });
    return skills;
  } catch (error) {
    console.error("Error in getSkillsByUserId:", error);
    return [];
  }
};

export const updateSkills = async (
  skill_id: string,
  data: Prisma.skillsUpdateInput
) => {
  try {
    const skills = await db.skills.update({
      where: { skill_id },
      data,
    });
    return skills;
  } catch (error) {
    console.error("Error in updateSkills:", error);
    return null;
  }
};

export const deleteSkills = async (skill_id: string) => {
  try {
    const skills = await db.skills.delete({
      where: { skill_id },
    });
    return skills;
  } catch (error) {
    console.error("Error in deleteSkills:", error);
    return null;
  }
};

export const getAllSkills = async () => {
  try {
    const allSkills = await db.skills.findMany();
    return allSkills;
  } catch (error) {
    console.error("Error in getAllSkills:", error);
    return [];
  }
};
