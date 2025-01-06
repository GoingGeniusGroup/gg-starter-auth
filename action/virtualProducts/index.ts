"use server";
import { z } from "zod";

import { virtualSchema } from "@/inventorySchema";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";

export const getVirtualProducts = cache(
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

export const getVirtualCategories = cache(
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
    { revalidate: 60 }
  );

 
  
  export async function saveVirtualProduct(formData: FormData) {
    // Process the images field as an array of URLs
    // const images = (formData.get("images") as string || "")
    // .split(',')
    // .map((url) => url.trim()) 
    // .filter((url) => url); // Remove any empty URLs    
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      stockQuantity: parseInt(formData.get("stockQuantity") as string, 10),
      type: formData.get("type") as string,
      categoryId: formData.get("categoryId") as string,
      images: formData.getAll("images") as string[],
    };

    try {
      // Validate the data 
      // const validData = virtualSchema.parse(data);
  
  
      const existingProduct = await db.virtualProduct.findFirst({
        where: { name: data.name },
      });
      if (existingProduct) {
        return { success: false, message: "Product must be unique" };
      }
  
      
      const newProduct = await db.virtualProduct.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          stockQuantity: data.stockQuantity,
          type: data.type,
          rating: 1,
          categoryId: data.categoryId,
          images: data.images, 
        },
      });
  
      return { success: true, data: newProduct };
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        return { success: false, errors: fieldErrors };
      } else if (error instanceof Error) {
        // Handle unexpected errors
        console.error("Unexpected error has occurred:", {
          message: error.message,
          data,
        });
      } else {
        console.error("Unexpected error has occurred:", error);
      }
      return { success: false, message: "An unexpected error has occurred" };
    }
}

  