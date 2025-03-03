import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const khaltiResponse = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (khaltiResponse) {
      //find the user by id
      const userExists = await db.user.findUnique({
        where: { id: payload.user_id },
      });

      //check if user exists
      if (!userExists) {
        return NextResponse.json(
          {
            success: false,
            message: "User not found",
          },
          { status: 404 }
        );
      }

      //store new topup record
      const topup = await db.topup.create({
        data: {
          amount: payload.amount / 100,
          topupType: "CREDIT",
          topupStatus: "PENDING",
          userId: userExists.id,
        },
      });
      return NextResponse.json({
        success: true,
        data: khaltiResponse?.data,
        topup: topup.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log(`khalti error: ${error}`);
    throw new Error("Something went wrong");
  }
}
