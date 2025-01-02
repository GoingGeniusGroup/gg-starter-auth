"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { esewaTopup } from "@/actions/esewa/index";
import { useSession } from "next-auth/react";
import { khaltiTopup } from "@/app/actions/khalti";
import { useRouter } from "next/navigation";

export default function PaymentGateway() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!session) {
    return <div>Please login to proceed with the payment.</div>;
  }

  //method to handle esewa payment
  const handleEsewaPayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await esewaTopup({
        userId: session.user.id,
        amount: 100,
      });

      if (response.success && response.data?.esewaConfig) {
        toast.success("eSewa payment initiated successfully");

        // Create and submit the form
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        Object.entries(response.data.esewaConfig).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        setError(
          response.error ||
            "Failed to initiate eSewa payment. Please try again."
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //method to handle khalti payment
  const handleKhaltiPayment = async () => {
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
        toast.success("Khalti payment initiated successfully");
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

  return (
    <div className="flex justify-center items-center relative">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-2">
          <CardTitle>Choose Payment Method</CardTitle>
          <CardDescription>
            Click the button below to pay with eSewa or Khalti
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          <Button
            onClick={handleEsewaPayment}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay with eSewa"}
          </Button>

          <Button
            onClick={handleKhaltiPayment}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay with Khalti"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
