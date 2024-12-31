"use server";

import { db } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { generateEsewaSignature } from "@/app/lib/esewa-utils";

interface EsewaTopupParams {
  amount: number;
  userId: string;
}

export async function esewaTopup({ amount, userId }: EsewaTopupParams) {
  try {
    const userExists = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return {
        success: false,
        error: `User with ID ${userId} does not exist.`,
      };
    }

    const topup = await db.topup.create({
      data: {
        amount,
        userId,
        topupType: "CREDIT",
        topupStatus: "PENDING",
      },
    });

    const transactionUuid = `${Date.now()}`;
    const taxAmount = 0;
    const totalAmount = amount + taxAmount;

    const esewaConfig = {
      amount: amount.toString(),
      tax_amount: taxAmount.toString(),
      total_amount: totalAmount.toString(),
      transaction_uuid: transactionUuid,
      product_code: process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE!,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/esewa/success?topupId=${topup.id}`,
      failure_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/esewa/failure?topupId=${topup.id}`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    const signatureString = `total_amount=${esewaConfig.total_amount},transaction_uuid=${esewaConfig.transaction_uuid},product_code=${esewaConfig.product_code}`;
    const signature = generateEsewaSignature(
      process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY!,
      signatureString
    );

    console.log("eSewa topup initiated", { topupId: topup.id, esewaConfig });

    revalidatePath("/user/topups");

    return {
      success: true,
      data: {
        topupId: topup.id,
        esewaConfig: {
          ...esewaConfig,
          signature,
        },
      },
    };
  } catch (error) {
    console.error("eSewa topup initiation error:", error);
    return { success: false, error: "Failed to initiate eSewa topup" };
  }
}
