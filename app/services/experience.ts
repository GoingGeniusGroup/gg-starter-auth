import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createExperience = async (data: Prisma.experienceCreateInput) => {
  try {
    const { tools, project_skills, project_pictures } = data;
    const experience = await db.experience.create({
      data: {
        ...data,
        tools: tools
          ? (tools as string[])[0].split(",").map((tool) => tool.trim())
          : [],
        project_skills: project_skills
          ? (project_skills as string[])[0]
              .split(",")
              .map((skill) => skill.trim())
          : [],
        project_pictures: project_pictures
          ? (project_pictures as string[])[0]
              .split(",")
              .map((picture) => picture.trim())
          : [],
      },
    });

    const skills = experience.project_skills;

    await Promise.all(
      skills.map(async (skill) => {
        try {
          // Use upsert instead of create to handle existing skills
          return await db.skills.upsert({
            where: {
              skill_name: skill,
            },
            update: {
              // Add any fields you want to update if the skill already exists
              experience_id: experience.experience_id,
            },
            create: {
              skill_name: skill,
              skill_percentage: 0,
              gg_id: experience.gg_id,
              experience_id: experience.experience_id,
            },
          });
        } catch (error) {
          console.error(`Error creating skill ${skill}:`, error);
          // Optionally, you can choose to continue or throw
          return null;
        }
      })
    );
    return experience;
  } catch (error) {
    console.error("Error in createExperience:", error);
    return null;
  }
};

export const getExperienceById = async (experience_id: string) => {
  try {
    const experience = await db.experience.findUnique({
      where: { experience_id },
    });
    return experience;
  } catch (error) {
    console.error("Error in getExperienceById:", error);
    return null;
  }
};

export const getExperiencesByUserId = async (gg_id: string) => {
  try {
    const experiences = await db.experience.findMany({
      where: { gg_id },
    });
    return experiences;
  } catch (error) {
    console.error("Error in getExperiencesByUserId:", error);
    return [];
  }
};

export const updateExperience = async (
  experience_id: string,
  data: Prisma.experienceUpdateInput
) => {
  try {
    const experience = await db.experience.update({
      where: { experience_id },
      data,
    });
    return experience;
  } catch (error) {
    console.error("Error in updateExperience:", error);
    return null;
  }
};

export const deleteExperience = async (experience_id: string) => {
  try {
    const experience = await db.experience.delete({
      where: { experience_id },
    });
    return experience;
  } catch (error) {
    console.error("Error in deleteExperience:", error);
    return null;
  }
};

export const getAllExperiences = async () => {
  try {
    const experiences = await db.experience.findMany();
    return experiences;
  } catch (error) {
    console.error("Error in getAllExperiences:", error);
    return [];
  }
};
