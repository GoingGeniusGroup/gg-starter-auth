"use client";

import { useState } from "react";
import Image from "next/image";
import stripeLogo from "@/public/assets/stripe_logo.png";
import khaltiLogo from "@/public/assets/khalti_logo.png";

const paymentMethods = [
  {
    id: "khalti",
    name: "Khalti",
    image: khaltiLogo,
    description: "Pay easily using Khalti.",
  },
  {
    id: "stripe",
    name: "Stripe",
    image: stripeLogo,
    description: "Fast and secure payment",
  },
];

const PaymentDetails = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg mb-4">Select Payment Method</h3>
      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`
              relative p-4 rounded-lg border-2 cursor-pointer transition-all
              ${
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
          >
            <div className="flex flex-col items-center space-y-3">
              {typeof method.image === "string" ? (
                <img
                  src={method.image}
                  alt={method.name}
                  className="w-[120px] h-[80px] object-contain"
                />
              ) : (
                <Image
                  src={method.image}
                  alt={method.name}
                  width={120}
                  height={80}
                  objectFit="contain"
                />
              )}
              <div className="text-center">
                <h4 className="font-medium">{method.name}</h4>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMethod && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            You selected{" "}
            <span className="font-medium">
              {paymentMethods.find((m) => m.id === selectedMethod)?.name}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Click "Complete Checkout" to proceed with this payment method
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
