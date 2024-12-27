import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scrollarea";
import { CartItem } from "./types";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (productId: number) => void;
  onRemoveFromCart: (productId: number) => void;
  totalPrice: number;
  isMobile: boolean;
}

const CartSheet: React.FC<CartSheetProps> = ({
  isOpen,
  onClose,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  totalPrice,
  isMobile,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className={`w-full ${isMobile ? "sm:max-w-[100vw]" : "sm:max-w-lg"}`}
      >
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your items, adjust quantities, or proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea
          className={`flex-grow mt-4 ${
            isMobile ? "h-[calc(100vh-250px)]" : "h-[calc(100vh-200px)]"
          }`}
        >
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                    unoptimized
                    loading="lazy"
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="text-sm font-semibold">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Type:{" "}
                      {item.productType === "physical" ? "Physical" : "Virtual"}
                    </p>
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
          )}
        </ScrollArea>
        <SheetFooter className="mt-4">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold text-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              className="w-full"
              disabled={cartItems.length === 0}
              onClick={() => alert("Proceeding to checkout")}
            >
              Checkout
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
