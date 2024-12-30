"use server";

import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { generateEsewaSignature } from "@/app/lib/esewa-utils";

const prisma = new PrismaClient();

interface esewaTopupParams {
  amount: number;
  userId: string;
  productName: string;
  transactionId: string;
}

export async function esewaTopup({ amount, userId }: esewaTopupParams) {
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    //create new topup data
    const topup = await prisma.topup.create({
      data: {
        amount,
        userId,
        topupType: "CREDIT",
        topupStatus: "PENDING",
      },
    });

    //Generate esewaConfiguration
    const transactionUuid = `${Date.now()}`;
    console.log(transactionUuid);
    const esewaConfig = {
      amount: amount.toString(),
      tax_amount: "0",
      transaction_uuid: transactionUuid,
      total_amount: amount.toString(),
      product_code: process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE,
      product_service_charge: "0",
      product_delivery_charge: "0",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/esewa/success?topupId=${topup.id}`,
      failure_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/esewa/faliure?topupId=${topup.id}`,
    };

    const signatureString = `total_amount=${esewaConfig.total_amount},transaction_uuid=${esewaConfig.transaction_uuid},product_code=${esewaConfig.product_code}`;
    const signature = generateEsewaSignature(
      process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY!,
      signatureString
    );

    console.log("esewa topup initiated", { topupId: topup.id, esewaConfig });

    //Revalidate path where the user topup might be displayed
    revalidatePath("user/topups");

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
    throw new Error("Failed to initiate eSewa topup");
  }
}
