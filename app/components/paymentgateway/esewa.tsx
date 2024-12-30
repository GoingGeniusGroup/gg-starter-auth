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
import { toast } from "sonner";
import { esewaTopup } from "@/actions/esewa/index";
import { useSession } from "next-auth/react";

export default function EsewaPayment() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    amount: "",
    productName: "",
    transactionId: "",
  });
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
      const response = await esewaTopup({
        userId,
        amount: parseFloat(formData.amount),
        productName: formData.productName,
        transactionId: formData.transactionId,
      });

      if (response.success) {
        const { esewaConfig } = await response.data;

        toast.success("esewa payment integrated successfully");

        // Create a POST form and submit it to eSewa
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        // form.enctype = ""

        // Append each key-value pair from esewaConfig to the form
        Object.entries(esewaConfig).forEach(([Key, value]) => {
          const input = document.createElement("input");
          (input.type = "hidden"), (input.name = Key);
          input.value = value as string;
          form.appendChild(input);
        });

        // Append the form to the body and submit it
        document.body.appendChild(form);
        form.submit();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("eSewa payment initiation error:", error);
      setError("Failed to initiate eSewa payment. Please try again.");
      toast.error("eSewa payment initiation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  //function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center relative">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>eSewa Payment</CardTitle>
          <CardDescription>Enter payment details for eSewa</CardDescription>
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
                min="1"
                step="0.01"
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                value={formData.transactionId}
                onChange={handleInputChange}
                required
                placeholder="Enter transaction ID"
                maxLength={50}
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
              {isLoading ? "Processing..." : "Pay with eSewa"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
