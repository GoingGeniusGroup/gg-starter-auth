"use server";
import { db } from "@/lib/db";

export async function getInventory() {
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
}