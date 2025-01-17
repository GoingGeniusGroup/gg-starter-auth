"use client";

import { FormEvent, ReactElement, ReactNode, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import axios from "axios";

export default function PaymentGateway() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);

  if (!session) {
    return <div>Please login to proceed with the payment.</div>;
  }

  //method to handle esewa payment
  // const handleEsewaPayment = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await esewaTopup({
  //       userId: session.user.id,
  //       amount: 100,
  //     });

  //     if (response.success && response.data?.esewaConfig) {
  //       toast.success("eSewa payment initiated successfully");

  //       // Create and submit the form
  //       const form = document.createElement("form");
  //       form.method = "POST";
  //       form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

  //       Object.entries(response.data.esewaConfig).forEach(([key, value]) => {
  //         const input = document.createElement("input");
  //         input.type = "hidden";
  //         input.name = key;
  //         input.value = value as string;
  //         form.appendChild(input);
  //       });

  //       document.body.appendChild(form);
  //       form.submit();
  //     } else {
  //       setError(
  //         response.error ||
  //           "Failed to initiate eSewa payment. Please try again."
  //       );
  //     }
  //   } catch (error) {
  //     setError("An error occurred. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  //method to handle khalti payment
  // const handleKhaltiPayment = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   const userId = session.user.id;

  //   try {
  //     const response = await khaltiTopup({
  //       amount: 1000,
  //       productName: "wallet",
  //       transactionId: `${Date.now()}`,
  //       userId,
  //     });

  //     if (response.success && response.paymentUrl) {
  //       toast.success("Khalti payment initiated successfully");
  //       router.push(response.paymentUrl);
  //     } else {
  //       setError(
  //         response.error || "Failed to initiate payment. Please try again."
  //       );
  //     }
  //   } catch (error) {
  //     setError("An error occurred. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleKhaltiPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount || amount < 10) {
      setError("Amount must be atleast 10");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/khalti/success`,
        website_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        amount: Math.round(amount) * 100,
        purchase_order_id: "test12",
        purchase_order_name: "test",
        customer_info: {
          name: session.user.username,
          email: session.user.email,
          phone: session.user.phone,
        },
        user_id: session.user.id,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/khalti`,
        payload
      );

      if (response.data.success) {
        toast.success("Khalti payment initiated successfully");
        router.push(response.data?.data?.payment_url);
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError("An error occured Please Try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center relative">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-2">
          <CardTitle>Khalti Payment</CardTitle>
          <CardDescription>Please enter the amount for payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action="" onSubmit={handleKhaltiPayment} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            {/* <Button
            onClick={handleEsewaPayment}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay with eSewa"}
          </Button> */}
            <Input
              type="number"
              min={10}
              placeholder="eg: 1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Pay with Khalti"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
