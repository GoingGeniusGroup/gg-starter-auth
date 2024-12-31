"use server";
import { db } from "@/lib/db";

export async function getCategories() {
  try {
    const categories = await db.virtualCategory.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}