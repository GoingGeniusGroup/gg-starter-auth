import { create } from "zustand";

interface Option {
  id: string;
  label: string;
  value: string;
}

import { Product } from "@prisma/client";
import { getProducts } from "../services/product";

interface ListOptions {
  categories: Option[];
  suppliers: Option[];
  products: Product[];
  getValues: () => void;
  fetchProducts: () => void;
  isLoading: boolean;
}

//https://chatgpt.com/c/66e7ad37-9600-8003-a4e9-09f30ee60bde ( for optimization)
export const useFetchValues = create<ListOptions>((set) => ({
  categories: [],
  suppliers: [],
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const productData = await getProducts();

      // Handle the case where productData might be null and ensure it's an array
      set({
        products: productData
          ? productData.map((product: any) => ({
              id: product.id,
              name: product.name,
              description: product.description || null,
              image: product.image || null,
              costPrice: product.costPrice || 0,
              unit: product.unit || "PIECE",
              quantityInStock: product.quantityInStock || 0,
              validity: product.validity || null,
              discount: product.discount || null,
              salePrice: product.salePrice || 0,
              margin: product.margin || null,
              status: product.status || "AVAILABLE",
              categoryId: product.categoryId || null,
              type: product.type || "DEFAULT",
              userId: product.userId || null,
            }))
          : [], // Fallback to empty array if productData is null
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      set({ isLoading: false });
    }
  },

  getValues: async () => {
    // ... similar implementation for categories and suppliers
  },
}));
