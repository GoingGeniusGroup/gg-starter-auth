"use server"
import { supplierSchema } from "@/inventorySchema"
import { db } from "@/lib/db";
import { z } from "zod";

export async function saveSupplier(formData: FormData) {
    const data={
        supplierName: formData.get("supplierName") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
    }
    try {
        const validData = supplierSchema.parse(data);
        const existingSupplier = await db.supplier.findFirst({
            where: { supplierName: validData.supplierName },
        });
        if (existingSupplier) {
            return { success: false, message: "Supplier must be unique" };
        }
        const newSupplier = await db.supplier.create({
            data: {
                supplierName: validData.supplierName,
                phone: validData.phone,
                email: validData.email,
                address: validData.address,
            },
        });
        return { success: true, data: newSupplier };
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
        console.error("Error:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
}

export async function getAllSuppliers() {
  try{
    const suppliers = await db.supplier.findMany({
        include:{
            Product:true
        }
  });
    return { success: true, data: suppliers };
  }catch(error){
    console.error("Error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}