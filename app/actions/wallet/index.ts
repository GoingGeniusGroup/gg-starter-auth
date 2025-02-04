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

export const updateUserBalance = async (userId: string, amount: number) => {
  try {
    // Find the user and deduct the amount
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.balance === null) {
      throw new Error("User balance is null");
    }
    const newBalance = user.balance - amount;

    if (newBalance < 0) {
      throw new Error("Insufficient balance for the transaction");
    }

    // Update the balance in the database
    await db.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });

    return { success: true, newBalance };
  } catch (error) {
    console.error("Error updating balance:", error);
    throw new Error("Failed to update balance");
  }
};