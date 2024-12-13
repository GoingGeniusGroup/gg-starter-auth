"use server";
import { db } from "@/lib/db";
import { response } from "@/lib/utils";
import { productSchema } from "@/schemas";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

const writeImageToDisk = async (image: File) => {
  await fs.mkdir("public/products", { recursive: true });
  const imagepath = `/products/${crypto.randomUUID()}~${image.name}`;
  await fs.writeFile(
    `public${imagepath}`,
    Buffer.from(await image.arrayBuffer())
  );

  return imagepath;
};

export const addProduct = async (payload: FormData) => {
  const payloadObject: any = {};

  for (const [key, value] of payload.entries()) {
    try {
      // Try to parse JSON values (for arrays and objects)
      payloadObject[key] = JSON.parse(value as string);
    } catch (error) {
      // If parsing fails, assign the value as it is (for non-JSON values like strings or files)
      payloadObject[key] = value as string;
    }
  }

  const validatedFields = productSchema.safeParse(payloadObject);

  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "invalid fields",
      },
    });
  }

  try {
    const data = validatedFields.data;
    const imagepath = await writeImageToDisk(data.image);
    const supplierIds = data.suppliers.map((sup) => sup.id);

    console.log(imagepath, "imagepath from server");

    const product = await db.product.create({
      data: {
        name: data.name,
        image: imagepath,
        costPrice: data.costPrice,
        quantityInStock: data.quantityInStock,
        categoryId: (
          await db.category.findFirst({
            where: { categoryName: "Electronics" },
          })
        )?.id!,
        description: data.description,
        validity: data.validity,
        discount: data.discount || null,
        salePrice: data.salePrice,
        margin: data.margin || null,
        suppliers: {
          connect: supplierIds.map((id) => ({ id })),
        },
      },
    });

    console.log(product, "product from server");

    if (product) {
      revalidatePath("/admin/products");
      return response({
        success: true,
        code: 201,
        message: "Product created successfully",
        data: product, // Include the created product in the response
      });
    } else {
      return response({
        success: false,
        error: {
          code: 500,
          message: "Failed to create product",
        },
      });
    }
  } catch (error) {
    console.error(error);

    return response({
      success: false,
      error: {
        code: 500,
        message: "Unknown error occurred",
      },
    });
  }
};
