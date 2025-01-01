"use server"
import { db } from "@/lib/db";
import { z } from "zod";
import fs from "fs/promises";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { productScheme } from "@/inventorySchema";

const writeImageToDisk = async (image: File) => {
  await fs.mkdir("public/upload/products", { recursive: true });
  const imagepath = `products/${crypto.randomUUID()}~${image.name}`;
  await fs.writeFile(`public/upload/${imagepath}`, Buffer.from(await image.arrayBuffer()));
  return imagepath.replace("public/", "");
};

export async function saveProduct(formData:FormData){
const data={
  name:formData.get("name") as string,
  description:formData.get("description") as string,
  salePrice:parseFloat(formData.get("salePrice") as string),
  costPrice:parseFloat(formData.get("costPrice") as string),
  stockQuantity:parseInt(formData.get("stockQuantity") as string),
  productImage:formData.getAll("productImage") as File[],
  brand:formData.get("brand") as string,
  rating:parseInt(formData.get("rating") as string),
  category:formData.get("category") as string,
  isFeatured:formData.get("isFeatured")==="true",
  discount:parseInt(formData.get("discount") as string),
  status:formData.get("status") ==="true",
}


try{
    //validation
    const validData=productScheme.parse(data)
    console.log(validData)
      const existingProduct=await db.product.findFirst({
        where:{name:validData.name}
      })

      if(existingProduct){
        return {success:false,message:"Product must be unique"}
      }
      const imgPaths = await Promise.all(
       validData && validData.productImage.map(async (file) => {
          return await writeImageToDisk(file);
        })
      );
      console.log("hello")
      const newProduct=await db.product.create({
        data:{
          name:validData.name,
          description:validData.description,
          salePrice:validData.salePrice,
          costPrice:validData.costPrice,
          stockQuantity:validData.stockQuantity,
          imageUrl:imgPaths,
          brand:validData.brand,
          rating:validData.rating,
          categoryId:validData.category,
          isFeatured:validData.isFeatured,
          discount:validData.discount,
          status:validData.status
        }
      });
      return{success:true,data:newProduct}
    
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
    if (error instanceof Error) {
      console.error("Unexpected error has occured:", {
        message: error.message,
        // stack: error.stack,
        data,
      });
    } else {
      console.error("Unexpected error has occured:", error);
    }
    return { success: false, message: "An unexpected error has occurred" };
    }
}

export async function getAllproducts(){
  try{
    const products=await db.product.findMany({
      include:{
        category:true
      }
    })
    return {success:true,data:products}
} catch(error){
  console.error("Unexpected error has occured:", error);
  return { success: false, message: "An unexpected error has occurred" };
}
}