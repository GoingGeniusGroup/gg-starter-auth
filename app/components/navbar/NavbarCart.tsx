"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CartSheet from "./CartSheet";
import type { CartItem } from "./types";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function NavbarCart() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useLocalStorage<CartItem[]>("shopping-cart", []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return prevCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex > -1) {
        const existingItem = prevCart[existingItemIndex];

        if (existingItem.quantity > 1) {
          return prevCart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevCart.filter((_, index) => index !== existingItemIndex);
        }
      }

      return prevCart;
    });
  };

  return (
    <div className="relative">
      <button
        className="flex items-center focus:outline-none"
        onClick={() => setIsCartOpen(true)}
        aria-label="Open shopping cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {totalItems}
          </Badge>
        )}
      </button>

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
      />
    </div>
  );
}
