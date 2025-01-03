import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

// changed email to find first user
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: {
          has: email,
        },
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        isTwoFactorEnabled: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
};

// method to get all users by email
export const getAllUsersByEmail = async (email: string) => {
  try {
    const user = await db.user.findMany({
      where: {
        email: {
          has: email,
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error to get all usersbyemail", error);
    return null;
  }
};

// method to finduserbyPhone
export const getUserByPhone = async (phone: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        mobilePhone: {
          has: phone,
        },
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        isTwoFactorEnabled: true,
      },
    });
    if (!user) {
      console.log(`User not found with phone number: ${phone}`);
    }
    return user;
  } catch (error) {
    console.error("Error in getUserByPhone:", error);
    return null;
  }
};

//method to get all users by phone number
export const getAllUsersByPhone = async (phone: string) => {
  try {
    const user = db.user.findMany({
      where: {
        mobilePhone: {
          has: phone,
        },
      },
    });
    if (!user) {
      console.log(`User not found with Phone Number ${phone}`);
    }
    return user;
  } catch (error) {
    console.error("Error in getAllUsersByPhone:", error);
    return null;
  }
};

// method to get user by their username
export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        userName: {
          has: username,
        },
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        isTwoFactorEnabled: true,
      },
    });
    if (!user) {
      console.log(`User not found with username ${username}`);
    }
    return user;
  } catch (error) {
    console.error("Error in getUserByUsername:", error);
    return null;
  }
};

// method to get all users by usernames
export const getAllUsersByUsername = async (usernames: string) => {
  try {
    const user = await db.user.findMany({
      where: {
        userName: {
          has: usernames,
        },
      },
    });
    if (!user) {
      console.log(`Users not found with usernames ${usernames}`);
    }
    return user;
  } catch (error) {
    console.error("Error in getUserByUsername:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error("Error in getUserById:", error);
    return null;
  }
};

export const createUser = async (userData: Prisma.UserCreateInput) => {
  try {
    return await db.user.create({
      data: userData,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return null;
  }
};

export const updateUserById = async (
  id: string,
  userData: Prisma.UserUpdateInput
) => {
  try {
    return await db.user.update({
      where: { id },
      data: userData,
    });
  } catch (error) {
    console.error("Error in updateUserById:", error);
    return null;
  }
};

// export const removeImageByUserId = async (gg_id: string) => {};
