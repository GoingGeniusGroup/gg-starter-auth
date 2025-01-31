"use client";

import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import BusinessCard from "@/app/components/card/businessCard";
import StudentCard from "@/app/components/card/studentCard";
import { getUserBalance } from "@/app/actions/wallet";
interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
}

export default function WalletComponent() {
  const [balance, setBalance] = useState<number | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [redeemCode, setRedeemCode] = useState("");
  const [activeSection, setActiveSection] = useState<"topup" | "redeem" | null>(
    null
  );
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: "Top Up", amount: 500, date: "2024-06-10" },
    { id: 2, type: "Coffee purchase", amount: -50, date: "2024-06-09" },
    { id: 3, type: "bag purchase", amount: -50, date: "2024-06-19" },
  ]);
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "john doe",
      number: "1234 5678 9012 3456",
      expiry: "05/25",
      type: "VISA",
    },
  ]);
  const [activeTab, setActiveTab] = useState<"cards" | "transactions">(
    "transactions"
  );
  const [addingCard, setAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    name: "",
    number: "",
    expiry: "",
    type: "",
  });

  useEffect(() => {
    async function fetchBalance() {
      const result = await getUserBalance();
      if (result.success && result.data) {
        setBalance(result.data);
      }
    }
    fetchBalance();
  }, []);

  if (!session) {
    return <div>Please login to proceed with the payment.</div>;
  }

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (!isNaN(amount) && amount > 0) {
      setBalance(balance + amount);
      setTransactions([
        {
          id: Date.now(),
          type: "Top Up",
          amount: amount,
          date: new Date().toISOString().split("T")[0],
        },
        ...transactions,
      ]);
      setTopUpAmount("");
      setActiveSection(null);
    }
  };
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

  const handleRedeem = () => {
    if (redeemCode.length === 16) {
      const redeemAmount = 50;
      setBalance(balance - redeemAmount);
      setTransactions([
        {
          id: Date.now(),
          type: "Redeem",
          amount: -redeemAmount,
          date: new Date().toISOString().split("T")[0],
        },
        ...transactions,
      ]);
      setRedeemCode("");
      setActiveSection(null);
    }
  };

  const handleAddCard = () => {
    if (newCard.name && newCard.number && newCard.expiry && newCard.type) {
      setCards([...cards, { ...newCard, id: Date.now() }]);
      setNewCard({ name: "", number: "", expiry: "", type: "" });
      setAddingCard(false);
    }
  };

  return (
    <div className="mb-2 overflow-auto w-full h-full ">
      <h1 className="p-2 ml-5 font-bold dark:text-gray-300">My Wallet</h1>

      <CardContent className="space-y-4">
        {/* Wallet Info */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-red-900 p-4 text-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm opacity-80 mb-1">Current Balance</p>
              <div className="flex items-center gap-2">
                {showBalance ? (
                  <p className="text-2xl font-bold">Rs.{balance.toFixed(2)}</p>
                ) : (
                  <p className="text-2xl font-bold">****</p>
                )}
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="opacity-80 hover:opacity-100"
                >
                  {showBalance ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <CreditCard className="h-8 w-8" />
          </div>
          <p className="text-sm opacity-80">Valid Thru: 12/25</p>
          <p className="text-sm opacity-80">**** **** **** 1234</p>
        </div>
        {/* Top Up & Redeem */}
        <div className="flex gap-4">
          <Button
            className={`flex-1 dark:bg-transparent dark:text-gray-500 dark:border ${
              activeSection === "topup" ? "dark:bg-white dark:text-black" : ""
            }`}
            onClick={() =>
              setActiveSection(activeSection === "topup" ? null : "topup")
            }
          >
            Top Up
          </Button>
          <Button
            variant="outline"
            className={`flex-1 dark:bg-transparent dark:text-gray-500 dark:border ${
              activeSection === "redeem" ? "dark:bg-white dark:text-black" : ""
            }`}
            onClick={() =>
              setActiveSection(activeSection === "redeem" ? null : "redeem")
            }
          >
            Redeem
          </Button>
        </div>

        {activeSection === "topup" && (
          <div className="space-y-2">
            {/* <Input
              type="number"
              placeholder="Enter Top Up Amount"
              value={topUpAmount}

              onChange={(e) => setTopUpAmount(e.target.value)}
              // value={amount}
              // onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Button onClick={handleTopUp} className="w-full">
              Confirm Top Up
            </Button> */}
            {/* <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Pay with Khalti"}
            </Button> */}
            <form
              action=""
              onSubmit={handleKhaltiPayment}
              className="space-y-4"
            >
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
                className="dark:text-white"
                type="number"
                min={10}
                placeholder="eg: 1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />

              <Button
                type="submit"
                onClick={handleTopUp}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay with Khalti"}
              </Button>
            </form>
          </div>
        )}

        {activeSection === "redeem" && (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter 16-digit Redeem Code"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              maxLength={16}
            />
            <Button
              onClick={handleRedeem}
              className="w-full "
              disabled={redeemCode.length !== 16}
            >
              Redeem
            </Button>
          </div>
        )}

        {/* Toggle Buttons */}
        <div className="flex gap-1 bg-gray-200 p-1 dark:text-black rounded-lg">
          <Button
            variant="outline"
            className={`flex-1 ${
              activeTab === "transactions" ? "bg-white shadow" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </Button>
          <Button
            variant="outline"
            className={`flex-1 ${
              activeTab === "cards" ? "bg-white shadow" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("cards")}
          >
            Cards
          </Button>
        </div>

        {/* Active Tab Content */}
        {/* Transactions Section */}
        {activeTab === "transactions" && (
          <div>
            <h3 className="font-semibold mb-2">Transactions</h3>
            <div className="space-y-5 max-h-[235px] overflow-y-auto p-2 border rounded-md bg-gray-50">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                    <p
                      className={
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {transaction.amount > 0 ? "+" : ""}Rs.
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No transactions yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Cards Section */}
        {activeTab === "cards" && (
          <div>
            <h3 className="font-semibold mb-2">My Cards</h3>
            <div className="space-y-4 ">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className=" border rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 to-red-900 p-4 text-white"
                >
                  <div className="flex gap-10">
                    <div className="mr-[95px]">
                      <p className="font-medium mb-4">{card.type}</p>
                    </div>
                    <div>
                      <CreditCard className="h-8 w-8" />
                    </div>
                  </div>
                  <p className="mb-4">{card.number}</p>
                  <p className="text-sm text-gray-500">
                    Expiry: {card.expiry} | {card.name}
                  </p>
                </div>
              ))}
              {/* {addingCard ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Cardholder Name"
                      value={newCard.name}
                      onChange={(e) =>
                        setNewCard({ ...newCard, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Card Number"
                      value={newCard.number}
                      onChange={(e) =>
                        setNewCard({ ...newCard, number: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Expiry Date (MM/YY)"
                      value={newCard.expiry}
                      onChange={(e) =>
                        setNewCard({ ...newCard, expiry: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Card Type (e.g., VISA)"
                      value={newCard.type}
                      onChange={(e) =>
                        setNewCard({ ...newCard, type: e.target.value })
                      }
                    />
                    <Button onClick={handleAddCard} className="w-full">
                      Add Card
                    </Button>
                  </div>
                ) : ( */}
              <Button
                onClick={() => setAddingCard(true)}
                className="w-full flex items-center gap-2 "
              >
                <Plus /> Add New Card
              </Button>
              {/* )} */}
            </div>
          </div>
        )}
      </CardContent>
    </div>
  );
}
