
import { optional, z } from "zod";

const MAX_FILE_SIZE = 3145728; // 3 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const categorySchema = z.object({
  categoryName: z.string().min(3, "At least 3 characters are needed"),
  categoryDescription: z
    .string()
    .min(10, "Description should be at least 10 characters")
    .max(500, "Description should not exceed 500 characters"),
  categoryImage: z
    .array(
      z.instanceof(File).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only .jpg, .jpeg, .png, .webp files are accepted",
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "Max file size is 3 MB",
      })
    )
    .optional(), // Allow null for initial state
});

export type categoryData = z.infer<typeof categorySchema>;

export const productScheme=z.object({
name:z.string().min(3,"name must be of  characters"),
description: z.string().optional(),
salePrice: z.number().nonnegative("sale price must be positive").optional(),
costPrice: z.number().nonnegative("cost price must be positive").optional(),
stockQuantity: z.number().int().nonnegative().min(0,"stock must be at least 0"),
productImage: z.array(z.instanceof(File)
.refine((file)=>ACCEPTED_IMAGE_TYPES.includes(file.type),{message:"Only .jpg, .jpeg, .png, .webp files are accepted"}))
.optional(),
brand: z.string().optional(),
 rating: z.number().int().min(0).max(5,"rating must be between 0 and 5"),
 category: z.string(),
 isFeatured: z.boolean().optional(),
 discount: z.number().min(0).max(100).optional(),
 status: z.boolean().default(true),
})

export const supplierSchema=z.object({
  supplierName:z.string().min(3,"Name must be at least 3 characters"),
  phone:z.string().min(10,"Phone number must be at least 10 characters"),
  email:z.string().email("Invalid email address"),
  address:z.string()
})

export const inventorySchema=z.object({
  quantityAvailable: z.number().int().nonnegative(),
  thresholdValue:z.number().int().nonnegative(),
  address:z.string().optional().nullable(),
  product:z.string()
})

export const virtualSchema=z.object({
  name:z.string().min(3,"Name must be at least 3 characters"),
  description:z.string(),
  price:z.number().int().nonnegative(),
  stockQuantity:z.number().int().nonnegative(),
  type:z.string(),
  categoryId:z.string(),
  images: z.string()
})

export const virtualCategorySchema=z.object({
  name: z.string().min(3, "At least 3 characters are needed"),
})