"use client";
import { useState, useEffect } from "react";
import { PackagePlus, PackageMinus } from "lucide-react";
import { getAllCategories } from "@/action/category";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productScheme } from "@/inventorySchema";
import { saveProduct } from "@/action/product";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { on } from "events";
interface Category {
  id: string;
  categoryName: string;
}

interface ProductFormProps {
  onProductAdd: (newProduct: any) => void;
}
interface Product {
  name: string;
  description: string;
  salePrice: number;
  costPrice: number;
  stockQuantity: number;
  brand: string;
  rating: number;
  isFeatured: boolean;
  status: boolean;
  discount: number;
  category: string;
  productImage: string[];
}
interface ProductVariant {
  name: string;
  value: string;
}
const ProductForm = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productScheme),
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>("0.00");
  const calculateTotalPrice = (quantity: number, price: number) => {
    setTotalPrice((quantity * price).toFixed(2));
  };
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

  const onsubmit = async (data: Product) => {
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
      const result = await saveProduct(formData);
      if (result.success && result.data) {
        toast.success("Product has saved successfully!");
        console.log("Saved product:", result.data);
        reset();
        // revalidatePath("/inventory/products");
        router.push("/dashboard/product");
      } else {
        console.error("Validation errors:", result.errors);
        toast.warning("Validation errors occurred. Check console for details.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save product");
    }
  };

  return (
    <div className="p-6 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-full max-w-5xlshadow-lg rounded-lg p-6 space-y-6"
      >
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
          <legend className="text-xl font-bold text-blue-500 px-2">
            Product Form
          </legend>
          <fieldset className=" my-4 border rounded-lg p-4">
            <legend className="text-lg  text-blue-500 px-2">
              Product Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Product Name:
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  name="name"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* <div className="mb-4">
              <label htmlFor="productId" className="block text-sm font-semibold text-gray-700">Product ID:</label>
              <input
                type="text"
                id="productId"
                name="productId"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}

              <div className="mb-4">
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="stockQuantity"
                  {...register("stockQuantity", { valueAsNumber: true })}
                  name="stockQuantity"
                  min="0"
                  required
                  // value={quantity}
                  // onChange={(e) => {
                  //   const val = parseFloat(e.target.value) || 0;
                  //   setQuantity(val);
                  //   calculateTotalPrice(val, price);
                  // }}
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.stockQuantity && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.stockQuantity.message}
                  </p>
                )}
              </div>
              {/* <div className="mb-4">
              <label htmlFor="unit" className="block text-sm font-semibold text-gray-700">Unit:</label>
              <input
                type="text"
                id="unit"
                name="unit"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}

              {/* <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price per Unit:</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                required
                value={price}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setPrice(val);
                  calculateTotalPrice(quantity, val);
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}

              {/* <div className="mb-4">
              <label htmlFor="totalPrice" className="block text-sm font-semibold text-gray-700">Total Price:</label>
              <input
                type="text"
                id="totalPrice"
                name="totalPrice"
                value={totalPrice}
                readOnly
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
              <div className="mb-4">
                <label
                  htmlFor="costPrice"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Cost Price
                </label>
                <input
                  type="number"
                  id="costPrice"
                  {...register("costPrice", { valueAsNumber: true })}
                  name="costPrice"
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
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Sell Price
                </label>
                <input
                  type="number"
                  id="salePrice"
                  {...register("salePrice", { valueAsNumber: true })}
                  name="salePrice"
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
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Category:
                </label>
                <select
                  id="category"
                  {...register("category")}
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
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Image
                </label>
                <Controller
                  name="productImage"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="productImage"
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        field.onChange(Array.from(e.target.files || []))
                      }
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                {errors.productImage && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.productImage.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Product Description:
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  name="description"
                  rows={3}
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              {/* <div className="mb-4">
            <label htmlFor="reviews" className="block text-sm font-semibold text-gray-700">
            Product Reviews:
            </label>
            <textarea
              id="reviews"
              {...register("reviews")}
              name="reviews"
              rows={3}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Rating:(0-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  {...register("rating", { valueAsNumber: true })}
                  name="rating"
                  min="0"
                  step="1"
                  max="5"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.rating && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* <div className="mb-4">
              <label htmlFor="taxId" className="block text-sm font-semibold text-gray-700">TaxId:</label>
              <input
                type="text"
                id="taxId"
                name="taxId"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
              <div className="mb-4">
                <label
                  htmlFor="discount"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Discount(%):
                </label>
                <input
                  type="number"
                  id="discount"
                  {...register("discount", { valueAsNumber: true })}
                  name="discount"
                  min="0"
                  max="100"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.discount && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.discount.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="brand"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Brand:
                </label>
                <input
                  type="text"
                  {...register("brand")}
                  id="brand"
                  name="brand"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.brand && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.brand.message}
                  </p>
                )}
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
                <label
                  htmlFor="status"
                  className="text-lg font-medium text-gray-700 dark:text-gray-300"
                >
                  Available
                </label>
                <input
                  type="checkbox"
                  id="status"
                  {...register("status")}
                  name="status"
                  className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.status && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div className="mb-4 flex items-center gap-4">
                <label
                  htmlFor="isFeatured"
                  className="text-lg font-medium text-gray-700 dark:text-gray-300"
                >
                  Featured
                </label>
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  id="isFeatured"
                  name="isFeatured"
                  className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.isFeatured && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.isFeatured.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>
          {/* <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
        <legend className="text-lg  text-blue-500 px-2">Product Varient</legend>
        <div className="mb-4  flex items-center gap-4">
              <label htmlFor="varient" className="block text-sm font-semibold text-gray-700">varients:</label>
              <input
                type="text"
                id="varient"
                name="varient"
                placeholder="varient name eg:color,size"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
               <input
                type="text"
                id="varient"
                name="varient"
                placeholder="varient value eg:red,blue,xl,lg"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
        </fieldset> */}

          <button
            type="submit"
            className="w-full p-2 my-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ProductForm;
