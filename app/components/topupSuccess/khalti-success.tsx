"use client";

import { AlertOctagon, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "../ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export function KhaltiSuccess() {
  const searchparams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const amount = searchparams.get("total_amount");
  const transactionId = searchparams.get("transaction_id");
  const status = searchparams.get("status");

  // converting amount in rupees
  const amountInRupees = amount
    ? (parseInt(amount, 10) / 100).toFixed(2)
    : null;

  //Formatting current Date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}`;

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/khalti-lookup`,
          { pidx: searchparams.get("pidx") }
        );

        setIsSuccess(res.data.success);
      } catch (error) {
        setIsSuccess(false);
      }
    };
    checkPaymentStatus();
  }, [searchparams]);

  return (
    <Card className="w-full max-w-lg relative">
      {isSuccess === null ? (
        <h3 className="py-10 px-5 text-2xl font-semibold">
          Verifying your payment...
        </h3>
      ) : isSuccess ? (
        <>
          <CardHeader>
            <CardTitle className="flex">
              <CheckCircle className="text-green-500 mr-2" /> Payment Successful
            </CardTitle>
            <CardDescription>
              Your Khalti Payment has been processed successfully
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-gray-500">Amount</dt>
                <dd className="mt-1">
                  {amountInRupees ? `Rs. ${amountInRupees}` : "N/A"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">TransactionID</dt>
                <dd className="mt-1">{transactionId || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Date</dt>
                <dd className="mt-1">{formattedDate}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Status</dt>
                <dd className="mt-1">{status}</dd>
              </div>
            </dl>
            <Link href={"/"}>
              <Button variant={"outline"} className="w-full mt-6">
                Go to home
              </Button>
            </Link>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="flex">
              <AlertOctagon className="text-red-500 mr-2" /> Payment Failed
            </CardTitle>
            <CardDescription>
              Oops Some Problem occured Please Try again
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-gray-500">Amount</dt>
                <dd className="mt-1">
                  {amountInRupees ? `Rs. ${amountInRupees}` : "N/A"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">TransactionID</dt>
                <dd className="mt-1">{transactionId || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Date</dt>
                <dd className="mt-1">{formattedDate}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Status</dt>
                <dd className="mt-1">{status}</dd>
              </div>
            </dl>
            <Link href={"/"}>
              <Button variant={"outline"} className="w-full mt-6">
                Go to home
              </Button>
            </Link>
          </CardContent>
        </>
      )}
    </Card>
  );
}
