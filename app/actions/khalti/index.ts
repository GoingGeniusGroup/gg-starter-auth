"use server";

import { db } from "@/app/lib/db";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

interface khaltiTopupParams {
  amount: number;
  userId: string;
  productName: string;
  transactionId: string;
}

export async function khaltiTopup({
  amount,
  userId,
  productName,
  transactionId,
}: khaltiTopupParams) {
  try {
    //check if user exists
    const userExists = db.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    //create new topup data
    const topup = await db.topup.create({
      data: {
        amount,
        userId,
        topupStatus: "PENDING",
        topupType: "CREDIT",
      },
    });

    const khaltiConfig = {
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/esewa/success?topupId=${topup.id}`,
      website_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      amount: Math.round(parseFloat(amount.toString()) * 100),
      purchase_order_id: transactionId,
      purchase_order_name: productName,
    };
  } catch (error) {}
}
