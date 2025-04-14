"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllproducts } from "@/action/product";
import {
  getVirtualCategories,
  getVirtualProducts,
} from "@/action/virtualProducts";
import { getCategories } from "@/actions/category";
import ProductGrid from "./ProductGrid";
import VirtualProductGrid from "./VIrtualProductGrid";
import { useCart } from "@/contexts/CartContext";
import type { Product, VirtualProduct } from "@/types/product";

export default function ShopComponent() {
  const [activeTab, setActiveTab] = useState("physical");
  const [physicalProducts, setPhysicalProducts] = useState<Product[]>([]);
  const [virtualProducts, setVirtualProducts] = useState<VirtualProduct[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [virtualCategories, setVirtualCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  // Fetch physical products
  useEffect(() => {
    const fetchPhysicalProducts = async () => {
      try {
        const response = await getAllproducts();
        if (response.success && response.data) {
          const formattedProducts = response.data.map((product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description || "",
            price: product.salePrice,
            images: product.imageUrl || [],
            category: product.category?.categoryName || "Uncategorized",
            stockQuantity: product.stockQuantity,
            rating: product.rating,
          }));
          setPhysicalProducts(formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching physical products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (activeTab === "physical") {
      fetchPhysicalProducts();
      fetchCategories();
    }
  }, [activeTab]);

  // Fetch virtual products
  useEffect(() => {
    const fetchVirtualProducts = async () => {
      try {
        const data = await getVirtualProducts();
        if (data) {
          const formattedProducts = data.map((product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description || "",
            price: product.price,
            images: product.images || [],
            type: product.type,
            categoryId: product.categoryId,
            stockQuantity: product.stockQuantity,
            rating: product.rating,
          }));
          setVirtualProducts(formattedProducts);
        }
      } catch (error) {
        console.error("Error fetching virtual products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchVirtualCategories = async () => {
      try {
        const data = await getVirtualCategories();
        if (data) {
          setVirtualCategories(data);
        }
      } catch (error) {
        console.error("Error fetching virtual categories:", error);
      }
    };

    if (activeTab === "virtual") {
      fetchVirtualProducts();
      fetchVirtualCategories();
    }
  }, [activeTab]);

  const handleAddToCart = (
    product: any,
    productType: "physical" | "virtual"
  ) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images || [],
      productType,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Shop</h1>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="physical">Physical Products</TabsTrigger>
            <TabsTrigger value="virtual">Virtual Products</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="min-h-[500px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {activeTab === "physical" && (
              <ProductGrid
                products={physicalProducts}
                categories={categories}
                onAddToCart={(product) => handleAddToCart(product, "physical")}
              />
            )}
            {activeTab === "virtual" && (
              <VirtualProductGrid
                products={virtualProducts}
                categories={virtualCategories}
                onAddToCart={(product) => handleAddToCart(product, "virtual")}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
