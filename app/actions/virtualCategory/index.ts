"use server";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getCategories = cache(
  async () => {
    try {
      const categories = await db.virtualCategory.findMany();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },
  ["user/virtualCategories", "getCategories"],
  { revalidate: 60 * 60 * 24 }
);
