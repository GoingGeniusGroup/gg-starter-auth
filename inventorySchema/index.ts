import { z } from "zod";

const MAX_FILE_SIZE = 1024 *1024 * 3; // 3Mb
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const IMAGE_SCHEMA=z.
any()
.refine((files)=>files?.length>=1,{message:"Image is required"})
.refine((files)=>ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
{message:"only .jpg,.jpeg,.png,.webp files are accepted"})
.refine((files)=>files?.[0]?.size<=MAX_FILE_SIZE,{
    message:"Max file size of 3MB"
})


export const categorySchema=z.object({
    categoryName:z.string().min(3,"At least 3 character is needed "),
    categoryDescription:z.string().min(20,"Description shouls be of at least 20 character"),
    categoryImage:IMAGE_SCHEMA
})

export type categoryData=z.infer<typeof categorySchema>
