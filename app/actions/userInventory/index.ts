"use server";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getInventory = cache(
  async () => {
    try {
      const inventory = await db.userInventory.findMany({
        include: {
          VirtualProduct: {
            select: {
              name: true,
              description: true,
              images: true,
            },
          },
        },
      });
      return inventory;
    } catch (error) {
      console.error("Error fetching user inventory:", error);
      return [];
    }
  },
  ["user/userInventory", "getInventory"],
  { revalidate: 60 * 60 * 24 }
);
