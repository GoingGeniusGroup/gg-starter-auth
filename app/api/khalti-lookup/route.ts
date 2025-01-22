import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/app/lib/db";
import { TopupStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { pidx } = await req.json();

  if (!pidx) {
    return NextResponse.json({
      success: false,
      message: "Payment ID is required",
    });
  }
  try {
    const KhaltiResponseLookup = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
        },
      }
    );

    if (KhaltiResponseLookup) {
      const paymentStatus = KhaltiResponseLookup.data.status;
      const amount = KhaltiResponseLookup.data.total_amount / 100;

      //finding the topup by created date and status
      const newTopup = await db.topup.findFirst({
        where: {
          amount: amount,
          topupStatus: "PENDING",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      //if there is no topup record
      if (!newTopup) {
        return NextResponse.json({
          success: false,
          message: "Topup record not found",
        });
      }

      //update the stored topup
      let updatedTopupStatus: TopupStatus;
      if (paymentStatus === "Completed") {
        updatedTopupStatus = "SUCCESS";
      } else {
        updatedTopupStatus = "FAILED";
      }

      //update the stored topup status
      const updateTopup = await db.topup.update({
        where: { id: newTopup.id },
        data: { topupStatus: updatedTopupStatus },
      });

      //update the user balance
      if (updatedTopupStatus === "SUCCESS") {
        await db.user.update({
          where: { id: newTopup.userId },
          data: {
            balance: {
              increment: amount,
            },
          },
        });
      }
      return NextResponse.json({
        success: true,
        message: "Payment Successful",
        topup: updateTopup,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment not complete",
      });
    }
  } catch (error: any) {
    //if user cancels or expires payment
    if (error.response?.status === 400) {
      const errorMessage =
        error.response?.data?.status || "Payment cancelled or expired";
      console.log(errorMessage);

      //find the topup by created date and status
      const newTopup = await db.topup.findFirst({
        where: {
          topupStatus: "PENDING",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      //update the topup status to failed
      if (newTopup) {
        await db.topup.update({
          where: { id: newTopup.id },
          data: { topupStatus: "FAILED" },
        });
      }

      return NextResponse.json({
        success: false,
        message: errorMessage,
      });
    }
    console.log(`Khalti error: ${error}`);
    return NextResponse.json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
}
