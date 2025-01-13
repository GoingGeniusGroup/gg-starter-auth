import { z } from "zod";

export const ProfileFormSchema = z.object({
  first_name: z.string().min(3, {
    message: "First name must be at least 3 characters.",
  }),
  last_name: z.string().min(3, {
    message: "Last name must be at least 3 characters.",
  }),
  address: z.string().min(3, {
    message: "Address must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  dob: z.date().nullable(),
  image: z.string().optional(),
});

export const GalleryImageUploadFormSchema = z.object({
  image_urls: z.array(z.string()),
});
