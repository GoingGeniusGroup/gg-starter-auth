"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

function PaymentSuccessContent() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const amount = searchParams.get("amount");
  const amountInUSD = amount ? (parseInt(amount, 10) / 100).toFixed(2) : null;

  const transactionId = searchParams.get("transaction_id");
  const slicedTransactionId = transactionId?.slice(0, 19);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}`;

  useEffect(() => {
    if (session_id && session?.user.id) {
      fetch(`/api/update-inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: session_id,
          userId: session.user.id, // Pass the userId here
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }, [session_id, session?.user.id]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex">
            <CheckCircle className="text-green-500 mr-2" /> Payment Successful
          </CardTitle>
          <CardDescription>
            Your Stripe Payment has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-medium text-gray-500">Amount</dt>
              <dd className="mt-1">$ {amountInUSD}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">TransactionID</dt>
              <dd className="mt-1">{slicedTransactionId || "N/A"}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Date</dt>
              <dd className="mt-1">{formattedDate}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Status</dt>
              <dd className="mt-1">Success</dd>
            </div>
          </dl>
          <Link href={"/"}>
            <Button variant={"outline"} className="w-full mt-6">
              Go to home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccessContent;
