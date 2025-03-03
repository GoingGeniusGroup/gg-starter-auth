"use server"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache"
import { subCatSchema } from "@/inventorySchema";
import { optional, z } from "zod";

export async function saveSubCategory(formData:FormData){
    const data={
        name:formData.get("name") as string,
        imageUrl:formData.get("imageUrl") as string

    }
    try{
        const validDate=subCatSchema.parse(data)
        const existCategory=await db.subcategory.findFirst({
            where:{name:validDate.name}
        })
        if (existCategory) {
            return { success: false, message: "Category must be unique" };
          }
          const newCategory=await db.subcategory.create({
            data:{
                name:validDate.name,
                imageUrl:validDate.imageUrl
            }

          })
                 revalidatePath("/dashboard/subcategory")
          
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

export async function getSubCategory() {
  try {
    const subCategories = await db.subcategory.findMany();

    return { success: true, data: subCategories };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}