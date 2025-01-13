"use server";

import { db } from "@/app/lib/db";
import { userAgent } from "next/server";

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
  

    return {
      success: true,
      transactionuuid,
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

//handle khalti payment status
export async function handleKhaltiStatus(
  transactionuuid: string,
  status: "success" | "failed"
) {
  try {
    console.log("Handling Khalti Status:", { transactionuuid, status });

    // Query for the pending topup
    const pendingTopup = await db.topup.findFirst({
      where: {
        topupStatus: "PENDING",
        createdAt: new Date(parseInt(transactionuuid)),
      },
    });

    if (!pendingTopup) {
      console.error(
        `No pending topup found for transactionuuid: ${transactionuuid}`
      );
      return {
        success: false,
        error: "No pending topup found for this transaction.",
      };
    }

    // Update the status
    const newStatus = status === "success" ? "SUCCESS" : "FAILED";

    const updatedTopup = await db.topup.update({
      where: { id: pendingTopup.id },
      data: { topupStatus: newStatus },
    });

    console.log("Topup status updated successfully:", updatedTopup);

    return {
      success: true,
      message: `Topup Status updated to ${newStatus} successfully`,
      status: newStatus,
    };
  } catch (error) {
    console.error("Error updating Khalti topup status:", error);
    return { success: false, error: "Failed to update topup status" };
  }
}
