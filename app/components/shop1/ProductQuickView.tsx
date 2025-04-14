"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, X } from "lucide-react";
import type { Product, VirtualProduct } from "@/components/types";

interface ProductQuickViewProps {
  product: Product | VirtualProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  productType: "physical" | "virtual";
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
  productType,
}: ProductQuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl">{product.name}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {productType === "virtual" ? "Virtual Product" : "Physical Product"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <div className="relative h-[300px] bg-gray-100 rounded-md overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < (product.rating || 0)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} out of 5 stars
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Price</h3>
              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
            </div>
            {productType === "virtual" && "type" in product && (
              <div>
                <h3 className="text-lg font-medium">Type</h3>
                <p className="text-muted-foreground">{product.type}</p>
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium">Availability</h3>
              <p
                className={`${
                  (product.stockQuantity || 0) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {(product.stockQuantity || 0) > 0
                  ? `In Stock (${product.stockQuantity} available)`
                  : "Out of Stock"}
              </p>
            </div>
            <Button
              className="w-full mt-6"
              size="lg"
              onClick={onAddToCart}
              disabled={(product.stockQuantity || 0) <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
