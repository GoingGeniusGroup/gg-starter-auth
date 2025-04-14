"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaymentDetails from "@/components/ShopComponent/subComponents/PaymentDetails";
import { CartItem } from "@/types/cart";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void;
  totalPrice: number;
}

const CartSheet = ({
  isOpen = false,
  onClose = () => {},
  cartItems = [],
  onAddToCart = () => {},
  onRemoveFromCart = () => {},
  totalPrice = 0,
}: CartSheetProps) => {
  const [activeStep, setActiveStep] = useState("cart");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (selectedMethod === "stripe") {
      try {
        const response = await fetch("/api/stripe-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems }),
        });
        const data = await response.json();
        if (data?.message?.url) {
          window.location.href = data.message.url;
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    } else {
      const cartData = encodeURIComponent(JSON.stringify(cartItems));
      window.location.href = `/payment/wallet?cart=${cartData}`;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {activeStep === "cart" ? "Your Cart" : "Payment Options"}
          </SheetTitle>
          <SheetDescription>
            {activeStep === "cart"
              ? "Review your items, adjust quantities, or proceed to checkout."
              : "Select a payment method to complete your purchase."}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow mt-4 h-[calc(100vh-250px)]">
          {activeStep === "cart" ? (
            cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button variant="outline" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.images && item.images.length > 0 ? (
                        <Image
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <ShoppingBag className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        ${Number(item.price).toFixed(2)} x {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.productType}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => onRemoveFromCart(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => onAddToCart(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <PaymentDetails
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          )}
        </ScrollArea>
        <SheetFooter className="mt-4 sm:justify-between">
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex gap-2">
              {activeStep === "payment" && (
                <Button
                  variant="outline"
                  onClick={() => setActiveStep("cart")}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cart
                </Button>
              )}

              {activeStep === "cart" ? (
                <Button
                  className="flex-1"
                  disabled={cartItems.length === 0}
                  onClick={() => setActiveStep("payment")}
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="flex-1"
                  disabled={!selectedMethod}
                  onClick={handleCheckout}
                >
                  Complete Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
