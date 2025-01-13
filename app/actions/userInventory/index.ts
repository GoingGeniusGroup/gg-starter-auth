"use server";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const getInventory = cache(
  async () => {
    try {
      const user = await currentUser(); 
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      const userId = user.id; 

      const inventory = await db.userInventory.findMany({
        where: {
          userId, 
        },
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
  { revalidate: 60 }
);
