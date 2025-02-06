"use server";

import { currentUser } from "@/app/lib/auth";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getUserBalance = cache(
  async () => {
    try {
      //get the current user
      const user = await currentUser();

      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      //find the user by id
      const userBalanceResult = await db.user.findUnique({
        where: { id: user.id },
        select: { balance: true },
      });

      //check if no user
      if (!userBalanceResult) {
        throw new Error("User balance not found");
      }

      return {
        success: true,
        data: userBalanceResult.balance,
      };
    } catch (error) {
      console.error("Error fetching user balance:", error);
      return {
        success: false,
        error: "Failed to fetch user balance",
      };
    }
  },
  ["getUserBalance"],
  { revalidate: 60, tags: ["userBalance"] }
);
