"use server";

import { avatar_response, response } from "@/types/utils";
import {
  createAvatar,
  deleteAvatarById,
  getAvatarsByUserId,
  updateAvatarById,
} from "@/services/avatar";
import { z } from "zod";
import { auth } from "@/auth";

const avatarSchema = z.object({
  avatar_url: z.string().url(),
});

export const addAvatar = async (avatar_url: string) => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return avatar_response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const validatedFields = avatarSchema.safeParse({ avatar_url });

  if (!validatedFields.success) {
    return avatar_response({
      success: false,
      error: {
        code: 422,
        message: "Invalid avatar URL.",
      },
    });
  }

  const newAvatar = await createAvatar({
    users: { connect: { gg_id: session.user.gg_id } },
    avatar_url: validatedFields.data.avatar_url,
  });

  if (!newAvatar) {
    return avatar_response({
      success: false,
      error: {
        code: 500,
        message: "Failed to create avatar.",
      },
    });
  }

  return avatar_response({
    success: true,
    code: 201,
    message: "Avatar created successfully.",
    data: newAvatar,
  });
};

export const updateAvatar = async (avatar_id: string, avatar_url: string) => {
  const validatedFields = avatarSchema.safeParse({ avatar_url });

  if (!validatedFields.success) {
    return avatar_response({
      success: false,
      error: {
        code: 422,
        message: "Invalid avatar URL.",
      },
    });
  }

  const updatedAvatar = await updateAvatarById(avatar_id, {
    avatar_url: validatedFields.data.avatar_url,
  });

  if (!updatedAvatar) {
    return avatar_response({
      success: false,
      error: {
        code: 500,
        message: "Failed to update avatar.",
      },
    });
  }

  return avatar_response({
    success: true,
    code: 200,
    message: "Avatar updated successfully.",
    data: updatedAvatar,
  });
};

export const deleteAvatar = async (avatar_id: string) => {
  const deletedAvatar = await deleteAvatarById(avatar_id);

  if (!deletedAvatar) {
    return avatar_response({
      success: false,
      error: {
        code: 500,
        message: "Failed to delete avatar.",
      },
    });
  }

  return response({
    success: true,
    code: 200,
    message: "Avatar deleted successfully.",
  });
};

export const getUserAvatars = async (gg_id: string) => {
  const avatars = await getAvatarsByUserId(gg_id);
  if (!avatars) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Failed to fetch user avatars.",
      },
    });
  }

  return response({
    success: true,
    code: 200,
    message: "User avatars fetched successfully.",
    data: avatars,
  });
};
