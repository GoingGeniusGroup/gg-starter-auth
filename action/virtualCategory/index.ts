"use server"
import { db } from "@/lib/db";
import { z } from "zod";
import { virtualCategorySchema } from "@/inventorySchema";
import { validate } from "uuid";

export async function saveVirtualCategory(formData:FormData){
    const data={
        name:formData.get("name") as string
    }
    try{
        const validDate=virtualCategorySchema.parse(data)
        const existCategory=await db.virtualCategory.findFirst({
            where:{name:validate.name}
        })
        if (existCategory) {
            return { success: false, message: "Category must be unique" };
          }
          const newCategory=await db.virtualCategory.create({
            data:{
                name:validDate.name
            }

          })
          return { success: true, data: newCategory };

    }
    catch (error) {
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

export async function getVirtualCategory() {
  try {
    const categories = await db.virtualCategory.findMany({
      include: { VirtualProduct: true },
    });

    return { success: true, data: categories };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}