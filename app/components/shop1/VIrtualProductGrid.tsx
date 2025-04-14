"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Star, CuboidIcon as Cube, Eye } from "lucide-react";
import type { VirtualProduct } from "@/types/product";
import ProductQuickView from "./ProductQuickView";

interface VirtualProductGridProps {
  products: VirtualProduct[];
  categories: any[];
  onAddToCart: (product: VirtualProduct) => void;
}

export default function VirtualProductGrid({
  products,
  categories,
  onAddToCart,
}: VirtualProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [selectedProduct, setSelectedProduct] = useState<VirtualProduct | null>(
    null
  );
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Create a map of category IDs to names
  useEffect(() => {
    const map: Record<string, string> = {};
    categories.forEach((category) => {
      map[category.id] = category.name;
    });
    setCategoryMap(map);
  }, [categories]);

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleQuickView = (product: VirtualProduct) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search virtual products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No virtual products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden flex flex-col h-full group"
            >
              <div className="relative h-48 bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Cube className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs">
                  Virtual
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleQuickView(product)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="flex-grow pt-4">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (product.rating || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-primary-foreground/70 mt-1">
                  {categoryMap[product.categoryId] || "Uncategorized"}
                </p>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="font-bold text-lg mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => onAddToCart(product)}
                  disabled={
                    product.stockQuantity ? product.stockQuantity <= 0 : true
                  }
                >
                  {product.stockQuantity ? (
                    product.stockQuantity > 0 ? (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    ) : (
                      "Out of Stock"
                    )
                  ) : (
                    "Out of Stock"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={() => {
          if (selectedProduct) {
            onAddToCart(selectedProduct);
          }
        }}
        productType="virtual"
      />
    </div>
  );
}
