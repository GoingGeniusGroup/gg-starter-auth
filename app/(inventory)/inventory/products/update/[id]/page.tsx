"use client"
import React, { use } from 'react'
import { useState ,useEffect, } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productScheme } from "@/inventorySchema";
import { useRouter } from "next/navigation";
import { updateProduct,getProductDetail } from "@/action/product";
import { getAllCategories } from "@/action/category";
import { Toaster, toast } from 'sonner'
interface Category{
    id:string;
    categoryName:string;
 
  }
  interface ProductData{
    id:string
    name:string,
    description:string,
    salePrice:number,
    costPrice:number,
    imageUrl:string[],
    stockQuantity:number,
    brand:string,
    rating:number,
    isFeatured:boolean,
    status:boolean,
    discount:number,
    category: string
    productImage:string[],
  }
  interface Product{
    id: string;
    name: string;
    description?: string;
    imageUrl: string[];
    salePrice?: number;
    costPrice?: number;
    discount?: number;
    stockQuantity?: number;
    rating:number
    brand?: string;
    category: {
      id: string;
      categoryName: string;
      categoryDescription?: string;
      categoryImage: string[];
    };
    productImage?: string[];
    status: boolean;
    isFeatured: boolean;
  };
interface UpdateProductProps {
  params: Promise<{
    id: string;
  }>;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<any | null>(null)
const [categories, setCategories] = useState<Category[]>([]);
const {
  control,
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<ProductData>({
  resolver: zodResolver(productScheme),
});
  useEffect(() => {
    async function fetchProduct() {
      try {
        const result = await getProductDetail(id);
        if (result.success && result.data) {
          setProduct(result.data);
        } else {
          console.error("Failed to fetch product:", result.message);
        }
      } catch (error) {
        console.error("failed to fetch product");
      }
    }
    fetchProduct()
  },[id])
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        salePrice: product.salePrice,
        costPrice: product.costPrice,
        stockQuantity: product.stockQuantity,
        brand: product.brand,
        rating: product.rating,
        isFeatured: product.isFeatured,
        status: product.status,
        discount: product.discount,
        category: product.category.id,
        productImage: product.productImage,
      });
    }
  }, [product, reset])
  

  useEffect(() => {
    async function fetchCategory() {
      try {
        const result = await getAllCategories();
        if (result.success && result.data) {
          setCategories(result.data);
        } else {
          console.error("Failed to fetch categories:", result.message);
        }
      } catch (error) {
        console.error("failed to fetch category");
      }
    }
    fetchCategory();
  }, []);

 


  const onsubmit = async (data: ProductData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("salePrice", data.salePrice.toString());
    formData.append("costPrice", data.costPrice.toString());
    formData.append("stockQuantity", data.stockQuantity.toString());
    formData.append("brand", data.brand);
    formData.append("rating", data.rating.toString());
    formData.append("isFeatured", data.isFeatured.toString());
    formData.append("status", data.status.toString());
    formData.append("discount", data.discount.toString());
    formData.append("category", data.category);
    if (data.productImage && data.productImage.length > 0) {
      data.productImage.forEach((image) => {
        formData.append("productImage", image);
      });
    }
    try {
      const result = await updateProduct(formData, id);
      if (result.success && result.data) {
        toast.success("Product updated successfully");
        router.push("/inventory/products");
      } else {
        toast.error("Failed to update product");
        console.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Error updating product");
      console.error("Error updating product", error);
    }
  };
  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
          <legend className="text-xl font-bold text-blue-500 px-2">
            Product Form
          </legend>
          <fieldset className="my-4 border rounded-lg p-4">
            <legend className="text-lg text-blue-500 px-2">
              Product Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Product Name:
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  name="name"
                  defaultValue={product.name}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  {...register("stockQuantity", { valueAsNumber: true })}
                  name="stockQuantity"
                  defaultValue={product.stockQuantity}
                  min="0"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.stockQuantity && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.stockQuantity.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="costPrice"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Cost Price
                </label>
                <input
                  type="number"
                  id="costPrice"
                  {...register("costPrice", { valueAsNumber: true })}
                  name="costPrice"
                  defaultValue={product.costPrice}
                  min="0"
                  step="0.01"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.costPrice && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.costPrice.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="salePrice"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Sell Price
                </label>
                <input
                  type="number"
                  id="salePrice"
                  {...register("salePrice", { valueAsNumber: true })}
                  name="salePrice"
                  defaultValue={product.salePrice}
                  min="0"
                  step="0.01"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.salePrice && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.salePrice.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Category:
                </label>
                <select
                  id="category"
                  {...register("category")}
                  defaultValue={product.category.id}
                  name="category"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Product Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option> ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
              <label htmlFor="productImage" className="block text-sm font-semibold text-gray-700">Image</label>
              <Controller name="productImage"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <input
                  type="file"
                id="productImage"
              accept="image/*"
            multiple
            onChange={(e) => field.onChange(Array.from(e.target.files || []))}
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"

              />
              )}
              />  
              {errors.productImage && ( <p className="text-sm text-red-500 mt-1">{errors.productImage.message}</p>)}
            </div>
             <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-semibold text-gray-700">Rating</label>
              <input
                type="number"
                id="rating"
                {...register("rating", { valueAsNumber: true })}
                name="rating"
                defaultValue={product.rating}                
                min="0"
                max="5"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
             </div>

       
          <div className="mb-4">
            <label htmlFor="discount" className="block text-sm font-semibold text-gray-700">Discount(%):</label>
            <input
              type="number"
              id="discount"
              {...register("discount", { valueAsNumber: true })}

              name="discount"
              min="0"
              max="100"
              defaultValue={product.discount}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            { errors.discount && ( <p className="text-sm text-red-500 mt-1">{errors.discount.message}</p>)}
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-semibold text-gray-700">Brand:</label>
            <input
              type="text"
              {...register("brand")}
              id="brand"
              name="brand"
            defaultValue={product.brand}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.brand && ( <p className="text-sm text-red-500 mt-1">{errors.brand.message}</p>)}
          </div>
        
          {/* <div className="mb-4">
            <label htmlFor="supplier" className="block text-sm font-semibold text-gray-700">Supplier:</label>
            <input
              type="text"
              {...register("supplier")}
              id="supplier"
              name="supplier"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
          <div className="mb-4 flex items-center gap-4">
          <label htmlFor="status" className="text-lg font-medium text-gray-700">
            Available
          </label>
            <input type="checkbox" id="status" 
            {...register("status")}
            name="status" 
            defaultChecked={product.status}
        
            className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
            {errors.status && ( <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>)}
          </div>
          <div className="mb-4 flex items-center gap-4">
          <label htmlFor="isFeatured" className="text-lg font-medium text-gray-700">
            Featured
          </label>
            <input type="checkbox"
            {
              ...register("isFeatured")
            }
            id="isFeatured" name="isFeatured" 
            defaultChecked={product.isFeatured}
            className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
            {errors.isFeatured && ( <p className="text-sm text-red-500 mt-1">{errors.isFeatured.message}</p>)}
          </div>

        </div>

      </fieldset>
      <button
        type="submit"
        className="w-full p-2 my-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Update
      </button>
      </fieldset>
      

    </form>
  </div>
  )
}

export default UpdateProduct