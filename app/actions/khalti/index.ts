"use server";

import { db } from "@/app/lib/db";

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

    // Create new topup data
    const newTopup = await db.topup.create({
      data: {
        amount,
        userId,
        topupStatus: "PENDING",
        topupType: "CREDIT",
      },
    });

    const khaltiConfig = {
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/topup/khaltiSuccess?transactionid=${newTopup.id}`,
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
      await db.topup.update({
        where: {
          id: newTopup.id,
        },
        data: {
          topupStatus: "FAILED",
        },
      });
    }

    const khaltiData = await khaltiResponse.json();

    return {
      success: true,
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

// handle khalti topup success
export async function handleKhaltiSuccess(
  transactionId: string,
  pidx: string,
  amount: number,
  mobile: string,
  purchase_order_name: string
) {
  try {
    //Find the pending topup
    const pendingTopup = await db.topup.findUnique({
      where: { id: transactionId },
      include: { user: true },
    });

    if (!pendingTopup) {
      throw new Error("Topup not found");
    }

    //update the topup with khalti transaction details
    const updatedTopup = await db.topup.update({
      where: { id: transactionId },
      data: {
        topupStatus: "SUCCESS",
      },
    });

    return {
      success: true,
      topup: updatedTopup,
      message: "Payment Processed Successfully",
    };
  } catch (error) {
    console.error("Error handling Khalti Topup", error);
    return {
      success: false,
      error: "Failed to process Khalti payment",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
