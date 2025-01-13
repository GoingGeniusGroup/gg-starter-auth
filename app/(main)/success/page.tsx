"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
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
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>
          </div>
          <CardTitle className="text-center text-2xl font-bold text-green-700">
            Payment Successful!
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                Thank you for your payment. Your transaction has been completed
                successfully.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PaymentSuccessContent;
