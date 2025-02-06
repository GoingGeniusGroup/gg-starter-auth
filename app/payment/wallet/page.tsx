"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import cardLogo from "@/public/assets/card_logos.png";
import cardLogoTwo from "@/public/assets/card_logo_two.png";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { getUserBalance } from "@/app/actions/wallet";
import { updateUserBalance } from "@/app/actions/wallet";
import { useSession } from "next-auth/react";

interface Item {
  name: string;
  price: number;
  images: string[];
}

interface ItemWithNPR extends Item {
  priceInNPR: string;
  images: string[];
}

interface CardOption {
  id: string;
  name: string;
  image: any;
  description: string;
}

const cardOptions: CardOption[] = [
  {
    id: "cardOne",
    name: "Wallet Card",
    image: cardLogo,
    description: "Pay easily using your saved card.",
  },
  {
    id: "cardTwo",
    name: "Wallet Card",
    image: cardLogoTwo,
    description: "Pay easily using your saved card.",
  },
];

const PaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [conversionRate, setConversionRate] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const userId = session?.user.id;

  // Parse cart items from URL
  const cart: Item[] = searchParams.get("cart")
    ? JSON.parse(decodeURIComponent(searchParams.get("cart")!))
    : [];

  console.log(cart);

  // Calculate total in USD
  const totalUSD: string = cart
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);

  // Convert prices to NPR
  const itemsInNPR: ItemWithNPR[] = conversionRate
    ? cart.map((item) => ({
        ...item,
        priceInNPR: (item.price * conversionRate).toFixed(2),
        images: item.images || [],
      }))
    : cart.map((item) => ({
        ...item,
        priceInNPR: "Loading...",
        images: item.images || [],
      }));

  // Calculate total in NPR
  const totalNPR: string = conversionRate
    ? itemsInNPR
        .reduce((acc, item) => acc + parseFloat(item.priceInNPR), 0)
        .toFixed(2)
    : "Loading...";

  // Fetch currency conversion rate (USD to NPR)
  useEffect(() => {
    const fetchConversionRate = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setConversionRate(data.rates.NPR);
      } catch (error) {
        console.error("Failed to fetch conversion rate:", error);
      }
    };

    fetchConversionRate();
  }, []);

  // Generate transaction id
  const generateTransactionId = () => {
    return `TXN-${userId}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleCheckout = async (): Promise<void> => {
    if (selectedMethod) {
      try {
        // Get user balance
        const balanceResponse = await getUserBalance();

        if (!balanceResponse.success) {
          toast.error("Failed to fetch user balance");
          return;
        }

        const userBalance = balanceResponse.data;

        // Convert totalNPR to a number for comparison
        const totalAmountNPR = parseFloat(totalNPR);

        if (
          userBalance !== null &&
          userBalance !== undefined &&
          userBalance >= totalAmountNPR
        ) {
          const transactionId = generateTransactionId();
          const sessionId = `session_${Date.now()}`;

          toast.success(`Payment Successful! Total paid: NPR ${totalNPR}`);

          if (userId) {
            await updateUserBalance(userId, totalAmountNPR);
            window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id=${sessionId}&transaction_id=${transactionId}&amount=${totalAmountNPR}`;
          } else {
            toast.error("User ID is missing.");
          }
        } else {
          toast.warning("Insufficient balance to complete the payment.");
        }
      } catch (error) {
        console.error("Error checking balance:", error);
        toast.error("An error occurred while checking balance.");
      }
    } else {
      toast.warning("Please select a payment method.");
    }
  };

  return (
    <div>
      <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cart Section */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-6">Cart Items</h2>
          <ScrollArea className="max-h-64">
            {itemsInNPR.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 border-b pb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="mr-3 w-16 h-16 rounded-md"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 font-medium">
                  NPR {item.priceInNPR}
                </p>
              </div>
            ))}
          </ScrollArea>
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-lg font-bold">Total:</h3>
            <p className="text-lg font-bold">NPR {totalNPR}</p>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-6">Payment</h2>
          <div className="space-y-4">
            <h3 className="font-medium text-lg mb-4">Select Wallet Card</h3>
            <div className="grid grid-cols-2 gap-4">
              {cardOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => setSelectedMethod(option.id)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMethod === option.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <Image
                      src={option.image}
                      alt={option.name}
                      width={120}
                      height={80}
                      className="w-[120px] h-[80px] object-contain"
                    />
                    <div className="text-center">
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <Button
            className="w-full mt-6"
            disabled={!selectedMethod}
            onClick={handleCheckout}
          >
            {selectedMethod
              ? `Pay NPR ${totalNPR} with ${
                  cardOptions.find((o) => o.id === selectedMethod)?.name
                }`
              : "Select a Payment Method"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
