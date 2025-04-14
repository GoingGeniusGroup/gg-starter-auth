"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CartSheet from "./CartSheet";
import { useCart } from "@/contexts/CartContext";

export default function NavbarCart() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart, totalItems, totalPrice } = useCart();

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
        onAddToCart={(id) =>
          addToCart({ id, name: "", price: 0, images: [], productType: "" })
        }
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
      />
    </div>
  );
}
