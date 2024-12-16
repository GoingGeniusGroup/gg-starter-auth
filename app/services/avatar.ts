import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getAvatarsByUserId = async (gg_id: string) => {
  try {
    const avatars = await db.avatar.findMany({
      where: { gg_id },
    });
    return avatars;
  } catch (error) {
    console.error("Error in getAvatarsByUserId:", error);
    return null;
  }
};

export const createAvatar = async (avatarData: Prisma.avatarCreateInput) => {
  try {
    return await db.avatar.create({
      data: avatarData,
    });
  } catch (error) {
    console.error("Error in createAvatar:", error);
    return null;
  }
};

export const updateAvatarById = async (
  avatar_id: string,
  avatarData: Prisma.avatarUpdateInput
) => {
  try {
    return await db.avatar.update({
      where: { avatar_id },
      data: avatarData,
    });
  } catch (error) {
    console.error("Error in updateAvatarById:", error);
    return null;
  }
};

export const deleteAvatarById = async (avatar_id: string) => {
  try {
    return await db.avatar.delete({
      where: { avatar_id },
    });
  } catch (error) {
    console.error("Error in deleteAvatarById:", error);
    return null;
  }
};
