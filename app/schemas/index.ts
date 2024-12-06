import { z } from "zod";

const EMAIL_SCHEMA = z
  .string()
  .min(1, "Email Address is required.")
  .email("Invalid Email Address.");

export const loginSchema = z.object({
  email: EMAIL_SCHEMA,
  password: z.string().min(1, "Password is required."),
});

export const registerSchema = z.object({
  email: EMAIL_SCHEMA,
  name: z
    .string()
    .min(1, {
      message: "Name is required.",
    })
    .min(4, "Name must be at least 4 characters.")
    .max(24, "Maximum length of Name is 24 characters."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

export const resendSchema = z.object({
  email: EMAIL_SCHEMA,
});

export const resetPasswordSchema = z.object({
  email: EMAIL_SCHEMA,
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match.",
    path: ["confirmPassword"],
  });

export const twoFactorSchema = z.object({
  code: z
    .string()
    .regex(/^[0-9]+$/, "Code must be a number.")
    .length(6, "Code must be 6 digits long."),
});

export const profileSchema = z
  .object({
    name: z.optional(
      z
        .string()
        .min(1, {
          message: "Name is required.",
        })
        .min(4, "Name must be at least 4 characters.")
        .max(24, "Maximum length of Name is 24 characters.")
    ),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6, "Password must be at least 6 characters.")),
    newPassword: z.optional(z.string().min(6, "New Password must be at least 6 characters.")),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    {
      message: "Password is required.",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      message: "New Password is required.",
      path: ["newPassword"],
    }
  );


  const MAX_FILE_SIZE = 5000000;
  const imageSchema = z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Image is required",
    })
    .refine(
      (file) => file.type.startsWith("image/"),
      "Invalid file type. Only image files are allowed."
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size should be less than 5MB."
    );

    export const productSchema = z.object({
      name: z.string().min(1, "Name is required"),
      image: imageSchema, // Assuming `imageSchema` is defined elsewhere
      description: z.string().optional(),
      
      costPrice: z.preprocess((value) => {
        if (typeof value === "string") {
          return parseFloat(value);
        }
        return value;
      }, z.number({
        required_error: "Cost price is required",
      })),
    
      quantityInStock: z.preprocess((value) => {
        if (typeof value === "string") {
          return parseFloat(value);
        }
        return value;
      }, z.number({
        required_error: "Quantity is required",
      })),
    
      validity: z.string().optional(),
      discount: z.string().optional(),
    
      salePrice: z.preprocess((value) => {
        if (typeof value === "string") {
          return parseFloat(value);
        }
        return value;
      }, z.number({
        required_error: "Sale price is required",
      })),
    
      margin: z.string().optional(),
    
      // Updated status field with correct error message handling
      status: z.enum(["AVAILABLE", "NOTAVAILABLE"], {
        required_error: "Status is required",
      }),
    
      category: z.string().refine((val) => val !== "", {
        message: "Please select a valid category",
      }),
    
      suppliers: z.array(
        z.object({
          id: z.string().min(1, { message: "Supplier ID is required" }),
          supplier: z.string().min(1, { message: "Supplier name is required" }),
        })
      ).nonempty({ message: "At least one supplier is required" }),
    });
  