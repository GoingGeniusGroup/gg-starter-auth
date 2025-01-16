import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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
      return NextResponse.json({
        success: true,
        message: "Payment Successful",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment not complete",
      });
    }
  } catch (error) {
    console.log(`khalti error: ${error}`);
    throw new Error("Something went wrong");
  }
}
