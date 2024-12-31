"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { khaltiTopup } from "@/app/actions/khalti";
import { useRouter } from "next/navigation";

export default function KhaltiPayment() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Ensure user is logged in
  if (!session) {
    return <div>Please login to proceed with the payment.</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const userId = session.user.id;

    try {
      const response = await khaltiTopup({
        amount: 1000,
        productName: "wallet",
        transactionId: `${Date.now()}`,
        userId,
      });

      if (response.success && response.paymentUrl) {
        router.push(response.paymentUrl);
      } else {
        setError(
          response.error || "Failed to initiate payment. Please try again."
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  // };

  return (
    <>
      <Script
        src="https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.22.0.0.0/khalti-checkout.iffe.js"
        strategy="lazyOnload"
      />
      <div className="flex justify-center items-center relative">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Khalti Payment</CardTitle>
            <CardDescription>Enter payment details for Khalti</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (NPR)</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {isLoading ? "Processing..." : "Pay with Khalti"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
