"use server";

import { currentUser } from "@/app/lib/auth";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";
import { error } from "console";

export const getUserBalance = cache(
  async () => {
    try {
      const user = await currentUser();

      if (!user || !user.id) {
        throw new Error("User doesn't exists");
      }

      const userId = user.id;

      const userBalance = db.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      if (!userBalance) {
        throw new Error("User balance not found");
      }
      return {
        success: true,
        data: userBalance,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: "Something went wrong",
      };
    }
  },
  ["getUserBalance"],
  { revalidate: 60, tags: ["userBalance"] }
);
