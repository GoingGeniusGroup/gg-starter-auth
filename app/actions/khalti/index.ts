"use server";

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

interface KhaltiTopupParams {
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
}: KhaltiTopupParams) {
  try {
    // Check if user exists
    const userExists = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    const transactionuuid = `${Date.now()}`;
    const khaltiConfig = {
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/khalti/success?transactionuuid=${transactionuuid}`,
      website_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      amount: Math.round(amount * 100),
      purchase_order_id: transactionId,
      purchase_order_name: productName,
    };

    // Initiate Khalti payment
    const khaltiResponse = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(khaltiConfig),
      }
    );

    if (!khaltiResponse.ok) {
      throw new Error("Failed to initiate Khalti payment");
    }

    const khaltiData = await khaltiResponse.json();

    // Create new topup data
    const topup = await db.topup.create({
      data: {
        amount,
        userId,
        topupStatus: "PENDING",
        topupType: "CREDIT",
      },
    });

    // Revalidate path where the user topup might be displayed
    revalidatePath("/user/topups");

    return {
      success: true,
      khaltiConfig: {
        ...khaltiConfig,
      },
      paymentUrl: khaltiData.payment_url,
    };
  } catch (error) {
    console.error("Khalti topup initiation error:", error);
    return {
      success: false,
      error: "Failed to initiate Khalti topup",
    };
  }
}
