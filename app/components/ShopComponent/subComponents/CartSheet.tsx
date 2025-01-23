import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaymentDetails from "./PaymentDetails";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  productType: string;
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (productId: string) => void;
  onRemoveFromCart: (productId: string) => void;
  totalPrice: number;
}

const CartSheet: React.FC<CartSheetProps> = ({
  isOpen = false,
  onClose = () => {},
  cartItems = [],
  onAddToCart = () => {},
  onRemoveFromCart = () => {},
  totalPrice = 0,
}) => {
  const [activeStep, setActiveStep] = useState("cart");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (selectedMethod !== "stripe") {
      console.log("Please select Stripe as your payment method.");
      return;
    }

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
      console.log("Checkout error:", error);
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
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                      loading="lazy"
                      width={64}
                      height={64}
                    />
                    <div className="flex-grow">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${Number(item.price).toFixed(2)} x {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        Total: $
                        {(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">Type: virtual</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onRemoveFromCart(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onAddToCart(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="h-4 w-4" />
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
        <SheetFooter className="mt-4">
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold text-lg">
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
