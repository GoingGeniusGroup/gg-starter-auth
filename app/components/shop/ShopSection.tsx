"use client";

import React, { useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import ProductList from "./subComponents/ProductList";
import { CartItem } from "./subComponents/types";
import CartSheet from "./subComponents/CartSheet";

import physicalProducts from "@/components/core/data/physicalProduct";

const ShopSection = ({ isMobile }: { isMobile: boolean }) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = React.useState<number[]>([]);
  const productDetailRef = useRef<HTMLDivElement | null>(null);
  // Function to toggle wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  // Get products based on the physical view
  const products = physicalProducts;

  // Dynamically extract categories from the products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const addToCart = (productId: number) => {
    const productType = "physical";
    const cartKey = `${productType}-${productId}`;
    setCart((prevCart) => ({
      ...prevCart,
      [cartKey]: (prevCart[cartKey] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: number) => {
    const productType = "physical";
    const cartKey = `${productType}-${productId}`;
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[cartKey] > 1) {
        newCart[cartKey]--;
      } else {
        delete newCart[cartKey];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const cartItems: CartItem[] = Object.entries(cart).map(([key, quantity]) => {
    const [productType, productId] = key.split("-");
    const product = physicalProducts.find((p) => p.id === parseInt(productId));
    return { ...product!, quantity, productType };
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Filter the products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div
      className={`container mx-auto px-2 pb-4 ${
        isMobile ? "h-full overflow-y-auto" : ""
      }`}
    >
      <header className="sticky -top-4 mb-4 p-2 z-20 bg-white/40 dark:text-white text-black rounded-md backdrop-blur-md">
        {isMobile ? (
          <>
            <div className="flex items-center justify-center mb-2 ">
              <h2 className="text-lg font-bold">SHOP</h2>
            </div>
            <div
              className="absolute left-2 top-2 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2"
                >
                  {totalItems}
                </Badge>
              )}
            </div>
          </>
        ) : (
          <div className="absolute top-5 right-4 z-20">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6 text-black" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 right-[-1px] size-4 p-1 flex justify-center"
                >
                  {totalItems}
                </Badge>
              )}
            </div>
          </div>
        )}
        <nav className="w-full">
          <ScrollArea className="w-full">
            <div className="flex space-x-2 p-1">
              {(categories || []).map((category, idx) => (
                <Button
                  key={idx}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  className={`text-xs whitespace-nowrap ${
                    selectedCategory === category
                      ? "font-semibold dark:text-black text-white"
                      : "dark:text-white text-black"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </nav>
      </header>

      <div className="flex">
        <div className={`w-full p-2`}>
          <ProductList
            products={filteredProducts}
            cart={cart}
            onAddToCart={addToCart}
            isMobile={isMobile || false}
            wishlist={wishlist} // Pass wishlist state
            onToggleWishlist={toggleWishlist}
          />
        </div>
      </div>

      {/* Cart sheet */}
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
        isMobile={isMobile || false}
      />
    </div>
  );
};

export default ShopSection;
