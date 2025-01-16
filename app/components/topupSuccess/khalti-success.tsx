"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "../ui/card";
import Link from "next/link";

export function KhaltiSuccess() {
  return (
    <Card className="w-full max-w-md relative">
      <CardHeader>
        <CardTitle className="flex">
          <CheckCircle className="text-green-500 mr-2" /> Payment Successful
        </CardTitle>
        <CardDescription>
          Your Khalti Payment has been processed successfully
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="font-medium text-gray-500">
              {topup.amount.toFixed(2)}
            </dt>
            <dd className="mt-1">NPR 1000</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">{topup.topupStatus}</dt>
            <dd className="mt-1">Success</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Date</dt>
            <dd className="mt-1">{topup.createdAt.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Type</dt>
            <dd className="mt-1">{topup.topupType}</dd>
          </div>
        </dl> */}
        <Link href={"/"}>
          <Button variant={"outline"} className="w-full mt-6">
            Go to home
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
