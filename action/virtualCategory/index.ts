"use server"
import { db } from "@/lib/db";
import { z } from "zod";
import { virtualCategorySchema } from "@/inventorySchema";
import { validate } from "uuid";
import { revalidatePath } from "next/cache";

export async function saveVirtualCategory(formData:FormData){
    const data={
        name:formData.get("name") as string
    }
    try{
        const validDate=virtualCategorySchema.parse(data)
        const existCategory=await db.virtualCategory.findFirst({
            where:{name:validDate.name}
        })
        if (existCategory) {
            return { success: false, message: "Category must be unique" };
          }
          const newCategory=await db.virtualCategory.create({
            data:{
                name:validDate.name
            }

          })
                 revalidatePath("/dashboard/virtualProduct/category")
          
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

export async function getVirtualCategoryDetail(categoryId:string){
  try{
    const category=await db.virtualCategory.findUnique({
      where:{id:categoryId},
      include:{
        VirtualProduct:true
      }
    })
    return {success:true,data:category}
  }
  catch(error){
    console.error("Unexpected error has occured:", error);
    return { success: false, message: "An unexpected error has occurred" };
}
}

export async function updateVirtualCategory(formData: FormData, categoryId: string) {
  const data = {
    name: formData.get("name") as string,
  };

  try {

    const validData = virtualCategorySchema.parse(data);

  
    const existingCategory = await db.virtualCategory.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return { success: false, message: "Virtual category not found" };
    }

  
    const duplicateCategory = await db.virtualCategory.findFirst({
      where: {
        name: validData.name,
        id: { not: categoryId },
      },
    });

    if (duplicateCategory) {
      return { success: false, message: "Virtual category name must be unique" };
    }

    
    const updatedCategory = await db.virtualCategory.update({
      where: { id: categoryId },
      data: {
        name: validData.name,
      },
    });
    revalidatePath("/dashboard/virtualProduct/category")

    return { success: true, data: updatedCategory };
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

export async function deleteVirtualCategory(categoryId:string){
    try{
        const existingCategory=await db.virtualCategory.findUnique({
            where:{id:categoryId}
        })

    if (!existingCategory) {
        return { success: false, message: "Category not found" };
      }

    // Delete the category
    await db.virtualCategory.delete({
      where: { id: categoryId },
    });
    revalidatePath("/dashboard/virtualProduct/category")
    return { success: true, message: "Category deleted successfully" };

    }
    catch(error){
        console.error("Unexpected error:", error);
        return { success: false, message: "An unexpected error occurred" };
    }

}
