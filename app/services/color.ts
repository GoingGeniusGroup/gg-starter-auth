"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { response } from "@/lib/utils";
import { Color, ThemeType } from "@prisma/client";
export const getColorsbyUserId = async () => {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }

    const response = await db.color.findMany({
      where: {
        userId: session.user.gg_id,
        status: true,
      },
    });

    return response;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const postColors = async (value: string, type: ThemeType) => {
  try {
    const session = await auth();
    if (!session) {
      return response({
        success: false,

        error: {
          code: 500,
          message: "please login to modify color",
        },
      });
    }

    const existingColor = await db.color.findFirst({
      where: {
        userId: session.user.gg_id,
        type: type,
        status: true,
      },
    });

    if (existingColor) {
      await db.color.update({
        where: { id: existingColor.id },
        data: { status: false },
      });
    }
    const newColor = await db.color.create({
      data: {
        userId: session.user.gg_id,
        value: value,
        type: type,
        status: true,
      },
    });

    return response({
      success: true,
      message: "successfully added color",
      code: 200,
      data: {
        color: newColor,
      },
    });
  } catch (error) {
    console.log(error);

    return response({
      success: false,

      error: {
        code: 500,
        message: "something went wrong",
      },
    });
  }
};
