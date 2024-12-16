"use server";

import { auth } from "@/auth";
import { response } from "@/lib/utils";
import {
  createExperience,
  deleteExperience,
  getExperienceById,
  getExperiencesByUserId,
  updateExperience,
} from "@/services/experience";
import { Response } from "@/types";
import { experience } from "@prisma/client";
import { z } from "zod";

// Define a schema for experience input validation
const experienceSchema = z.object({
  type: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  tools: z.array(z.string()).optional(),
  project_skills: z.array(z.string()).optional(),
  project_pictures: z.array(z.string()).optional(),
  link: z.string().url().optional(),
});

export const addExperience = async (
  formData: FormData
): Promise<Response<experience>> => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const validatedFields = experienceSchema.safeParse({
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    tools: formData.getAll("tools"),
    project_skills: formData.getAll("project_skills"),
    project_pictures: formData.getAll("project_pictures"),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields",
      },
    });
  }

  const newExperience = await createExperience({
    ...validatedFields.data,
    users: {
      connect: { gg_id: session.user.gg_id },
    },
  });

  if (!newExperience) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Failed to create experience",
      },
    });
  }

  return response<experience>({
    success: true,
    code: 201,
    message: "Experience created successfully",
    data: newExperience,
  });
};

export const getUserExperiences = async (): Promise<Response<experience[]>> => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const experiences = await getExperiencesByUserId(session.user.gg_id);

  return response<experience[]>({
    success: true,
    code: 200,
    data: experiences,
  });
};

export const updateUserExperience = async (
  experienceId: string,
  formData: FormData
): Promise<Response<experience>> => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const validatedFields = experienceSchema.partial().safeParse({
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    tools: formData.getAll("tools"),
    project_skills: formData.getAll("project_skills"),
    project_pictures: formData.getAll("project_pictures"),
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields",
      },
    });
  }

  const updatedExperience = await updateExperience(
    experienceId,
    validatedFields.data
  );

  if (!updatedExperience) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Failed to update experience",
      },
    });
  }

  return response<experience>({
    success: true,
    code: 200,
    message: "Experience updated successfully",
    data: updatedExperience,
  });
};

export const deleteUserExperience = async (
  experienceId: string
): Promise<Response<experience>> => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const deletedExperience = await deleteExperience(experienceId);

  if (!deletedExperience) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Failed to delete experience",
      },
    });
  }

  return response<experience>({
    success: true,
    code: 200,
    message: "Experience deleted successfully",
    data: deletedExperience,
  });
};

export const getExperience = async (
  experienceId: string
): Promise<Response<experience>> => {
  const experience = await getExperienceById(experienceId);

  if (!experience) {
    return response({
      success: false,
      error: {
        code: 404,
        message: "Experience not found",
      },
    });
  }

  return response<experience>({
    success: true,
    code: 200,
    data: experience,
  });
};
