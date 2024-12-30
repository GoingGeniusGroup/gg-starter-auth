
import { z } from "zod";

const MAX_FILE_SIZE = 3145728; // 3 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const categorySchema = z.object({
  categoryName: z.string().min(3, "At least 3 characters are needed"),
  categoryDescription: z
    .string()
    .min(20, "Description should be at least 20 characters")
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
