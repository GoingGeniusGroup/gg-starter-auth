import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// export async function POST(req: NextRequest) {
//   console.log(req);
//   const payload = req.json();
//   const khaltiResponse = await axios.post(
//     "https://dev.khalti.com/api/v2/epayment/initiate/",
//     payload,
//     {
//       headers: {
//         Authorization: `key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (khaltiResponse) {
//     return NextResponse.json({
//       success: true,
//       data: khaltiResponse?.data,
//     });
//   } else {
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// }

export async function GET() {
  return NextResponse.json({ message: "success" });
}
