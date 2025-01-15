"use server"
import { db } from "@/lib/db";
import { z } from "zod";
import { inventorySchema } from "@/inventorySchema";
import { revalidatePath } from "next/cache";

export async function saveInventory(formData: FormData) {
  const data = {
    product: formData.get("product") as string,
    quantityAvailable: parseInt(formData.get("quantityAvailable") as string),
    thresholdValue: parseInt(formData.get("thresholdValue") as string),
    address: formData.get("address") as string | null,
  };

  try {
    // Validation
    const validData = inventorySchema.parse(data);

    // Determine stock status
    let stockStatus: "AVAILABLE" | "LOWSTOCK" | "NOTAVAILABLE";
    if (validData.quantityAvailable <= 0) {
      stockStatus = "NOTAVAILABLE";
    } else if (validData.quantityAvailable < validData.thresholdValue) {
      stockStatus = "LOWSTOCK";
    } else {
      stockStatus = "AVAILABLE";
    }

    // Current date for stockUpdatedDate
    const stockUpdatedDate = new Date();

    // Check if inventory for the product already exists
    const existingInventory = await db.inventory.findFirst({
      where: { productId: validData.product },
    });

    if (existingInventory) {
      // Update existing inventory
      const updatedInventory = await db.inventory.update({
        where: { productId: validData.product },
        data: {
          quantityAvailable:validData.quantityAvailable,
          address:validData.address,
          thresholdValue:validData.thresholdValue,
          productId:validData.product,
          stockStatus:stockStatus,
          stockUpdatedDate:stockUpdatedDate
        },
      });
      return { success: true, data: updatedInventory };
    } else {
      // Create new inventory
      const newInventory = await db.inventory.create({
        data: {
            quantityAvailable:validData.quantityAvailable,
            address:validData.address,
            productId:validData.product,
            thresholdValue:validData.thresholdValue,
            stockStatus:stockStatus,
            stockUpdatedDate:stockUpdatedDate
          }
      });
          revalidatePath("/dashboard/inventory")
      
      return { success: true, data: newInventory };
    }
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

export async function getAllInventory(){
    try{
        const inventorys=await db.inventory.findMany({
            include:{
                product:true
            }
        })
        return{success:true,data:inventorys}
    }catch(error){
        console.error("Unexpected error has occured:", error);
        return { success: false, message: "An unexpected error has occurred" };
      }
}