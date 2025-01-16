"use server"
import { categorySchema } from "@/inventorySchema";
import { db } from "@/lib/db";
import { z } from "zod";
import fs from "fs/promises";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const writeImageToDisk = async (image: File) => {
  await fs.mkdir("public/upload/category", { recursive: true });
  const imagepath = `category/${crypto.randomUUID()}~${image.name}`;
  await fs.writeFile(`public/upload/${imagepath}`, new Uint8Array(await image.arrayBuffer()));
  return imagepath;
};

export async function savecategory(formData: FormData) {
  const data = {
    categoryName: formData.get("categoryName") as string,
    categoryDescription: formData.get("categoryDescription") as string,
    categoryImage: formData.getAll("categoryImage") as File[], // Get all the files
  };

  try {
    const validData = categorySchema.parse(data);
    
    const existingCategory = await db.category.findFirst({
      where: { categoryName: validData.categoryName },
    });

    if (existingCategory) {
      return { success: false, message: "Category must be unique" };
    }

    // Process each image
    const imgPaths = validData.categoryImage ? await Promise.all(
      validData.categoryImage.map(async (file) => {
        return await writeImageToDisk(file);
      })
    ) : [];

    const newCategory = await db.category.create({
      data: {
        categoryName: validData.categoryName,
        categoryDescription: validData.categoryDescription,
        categoryImage: imgPaths, // Save paths as an array
      },
    });
    revalidatePath("/dashboard/category");
    return { success: true, data: newCategory };
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



export async function updateCategory(formData: FormData, categoryid: string) {
  const data = {
    categoryName: formData.get("categoryName") as string,
    categoryDescription: formData.get("categoryDescription") as string,
    categoryImage: formData.getAll("categoryImage") as File[], // Get all the files
  }
  try {
    const validData = categorySchema.parse(data);

    const category = await db.category.findUnique({
      where: { id: categoryid },
    });

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    // Check if the category name is unique
    const duplicateCategory = await db.category.findFirst({
      where: {
        categoryName: validData.categoryName,
        id: { not: categoryid },
      },
    });

    if (duplicateCategory) {
      return { success: false, message: "Category name must be unique" };
    }

    // If new images are uploaded, write them to disk
    let imgPaths: string[] = [];
    if (validData.categoryImage && validData.categoryImage.length > 0) {
      imgPaths = await Promise.all(
        validData.categoryImage.map(async (file) => {
          return await writeImageToDisk(file);
        })
      );
    } else {
      // If no new images, keep the old images
      imgPaths = category.categoryImage;
    }

    // Update the category in the database
    const updatedCategory = await db.category.update({
      where: { id: categoryid },
      data: {
        categoryName: validData.categoryName,
        categoryDescription: validData.categoryDescription,
        categoryImage: imgPaths, // Save updated paths as an array
      },
    });
    revalidatePath("/dashboard/category");
    return { success: true, data: updatedCategory };
  } catch (error) {
    console.error("Unexpected error", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
export async function deleteCategory(categoryId:string){
    try{
        const existingCategory=await db.category.findUnique({
            where:{id:categoryId}
        })

    if (!existingCategory) {
        return { success: false, message: "Category not found" };
      }

    // Delete the category
    await db.category.delete({
      where: { id: categoryId },
    });
    revalidatePath("/dashboard/category")
    return { success: true, message: "Category deleted successfully" };

    }
    catch(error){
        console.error("Unexpected error:", error);
        return { success: false, message: "An unexpected error occurred" };
    }

}

///listing of all category
export async function getAllCategories() {
  try {
      const categories = await db.category.findMany({
        include: {products: true}
      }
       
      );

      return { success: true, data: categories };
  } catch (error) {
      console.error("Unexpected error:", error);
      return { success: false, message: "An unexpected error occurred" };
  }
}



  //get individual category details

export async function getCategory(id: string) {
  try {
    const category = await db.category.findUnique({
      where: { id },
    })
    if (!category) {
      return { success: false, message: 'Category not found' }
    }

    return { success: true, data: category }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, message: 'An unexpected error occurred' }
  }
}
