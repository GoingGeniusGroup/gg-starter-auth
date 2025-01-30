"use server"
import { virtualProdSchema } from "@/inventorySchema";
import { db } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
export async function saveVirtualProd(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      stockQuantity: parseInt(formData.get("stockQuantity") as string, 10),
      type: formData.get("type") as string,
      categoryId: formData.get("categoryId") as string,
      source: formData.get("source") as string | null,
      images: Array.from(formData.getAll("images")) as string[], 

  };

  try {
     

    // Check if the virtual product name already exists
    const existingProduct = await db.virtualProduct.findFirst({
      where: { name: data.name },
    });

    if (existingProduct) {
      return { success: false, message: "Virtual product must be unique" };
    }

    // Save the virtual product
    const newProduct = await db.virtualProduct.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stockQuantity: data.stockQuantity,
        type: data.type,
        rating:1,
        categoryId: data.categoryId,
        src: data.source ||null,
        images:data.images
      },
    });
    revalidatePath("/dashboard/virtualProduct")

    return { success: true, data: newProduct };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }

    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
