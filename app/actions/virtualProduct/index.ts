"use server";

import { cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getProducts = cache(
  async () => {
    try {
      const products = await db.virtualProduct.findMany();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
  ["user/virtualProducts", "getProducts"],
  { revalidate: 60 }
);