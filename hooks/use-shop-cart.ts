"use client"

import { useCart } from "@/contexts/CartContext"
import type { Product, VirtualProduct } from "@/components/types"

export function useShopCart() {
  const { cart, addToCart, removeFromCart, totalItems, totalPrice } = useCart()

  const addProductToCart = (product: Product | VirtualProduct) => {
    const isVirtualProduct = "type" in product

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      productType: isVirtualProduct ? "virtual" : "physical",
    })
  }

  return {
    cart,
    addProductToCart,
    removeFromCart,
    totalItems,
    totalPrice,
  }
}
