"use server";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getCategories = cache(
  async () => {
    try {
      const categories = await db.category.findMany();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
  ["user/categories", "getCategories"],
  { revalidate: 60 }
);
