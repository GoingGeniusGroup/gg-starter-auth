"use server";

import { db } from "@/lib/db";

export async function getProducts() {
  try {
    const products = await db.virtualProduct.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}