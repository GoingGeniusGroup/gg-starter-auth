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

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
