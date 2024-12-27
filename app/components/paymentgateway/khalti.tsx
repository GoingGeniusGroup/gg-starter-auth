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

export default function KhaltiPayment() {
  const [formData, setFormData] = useState({
    amount: "",
    productName: "",
    transactionId: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchDummyData = async () => {
  //       try {
  //         const response = await fetch("/api/dummy-data?method=khalti");
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch dummy data");
  //         }
  //         const data = await response.json();
  //         setAmount(data.amount);
  //         setProductName(data.productName);
  //         setTransactionId(data.transactionId);
  //       } catch (error) {
  //         console.error("Error fetching dummy data:", error);
  //       }
  //     };

  //     fetchDummyData();
  //   }, []);

  //   const handlePayment = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setIsLoading(true);

  //     try {
  //       const response = await fetch("/api/initiate-payment", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           method: "khalti",
  //           amount,
  //           productName,
  //           transactionId,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Payment initiation failed");
  //       }

  //       const data = await response.json();

  //       if (!data.khaltiPaymentUrl) {
  //         throw new Error("Khalti payment URL not received");
  //       }
  //       window.location.href = data.khaltiPaymentUrl;
  //     } catch (error) {
  //       console.error("Payment error:", error);
  //       alert("Payment initiation failed. Please try again.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

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
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  isLoading ||
                  !formData.amount ||
                  !formData.productName ||
                  !formData.transactionId
                }
              >
                {isLoading ? "Processing..." : "Pay with Khalti"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
