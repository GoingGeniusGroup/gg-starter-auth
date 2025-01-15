"use client";
import { useState, useEffect } from "react";
import { getAllproducts } from "@/action/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inventorySchema } from "@/inventorySchema";
import { saveInventory } from "@/action/inventory";

interface Products {
  id: string;
  name: string;
  stockQuantity: number;
}

interface Inventory {
  product: string;
  quantityAvailable: number;
  thresholdValue: number;
  address?: string;
}

const InventoryForm = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inventory>({
    resolver: zodResolver(inventorySchema),
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const result = await getAllproducts();
        if (result.success && result.data) {
          setProducts(result.data);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Failed to fetch data");
      }
    }
    fetchProduct();
  }, []);

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = event.target.value;
    const product = products.find((p) => p.id === selectedProductId) || null;
    setSelectedProduct(product);

    if (product) {
      setValue("quantityAvailable", product.stockQuantity);
    } else {
      setValue("quantityAvailable", 0); // Reset if no product is selected
    }
  };

  const onSubmit = async (data: Inventory) => {
    console.log("Form data:", data); // Debugging statement
    const formData = new FormData();
    formData.append("product", data.product);
    formData.append("quantityAvailable", data.quantityAvailable.toString());
    formData.append("thresholdValue", data.thresholdValue.toString());

    if (data.address) {
      formData.append("address", data.address);
    }

    try {
      const result = await saveInventory(formData);
      console.log("Save result:", result); // Debugging statement
      if (result.success && result.data) {
        toast.success("Inventory has been saved successfully!");
        console.log("Saved Inventory:", result.data);
        reset();
        router.push("/dashboard/inventory");
      } else {
        console.error("Validation errors:", result.errors);
        toast.warning("Validation errors occurred. Check console for details.");
      }
    } catch (error) {
      console.error("Failed to submit form", error);
      toast.error("Failed to save inventory");
    }
  };

  return (
    <div className="p-6 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl shadow-lg border rounded-lg p-6 space-y-6"
      >
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
          <legend className="text-xl font-bold text-blue-500 px-2">
            Inventory Form
          </legend>
          <fieldset className="my-4 border rounded-lg p-4">
            <legend className="text-lg text-blue-500 px-2">
              Item Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Product:
                </label>
                <select
                  id="product"
                  {...register("product")}
                  onChange={handleProductChange}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                {errors.product && (
                  <span className="text-red-500 text-sm">
                    {errors.product.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="quantityAvailable"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Quantity Available:
                </label>
                <input
                  type="number"
                  id="quantityAvailable"
                  {...register("quantityAvailable", { valueAsNumber: true })}
                  readOnly
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.quantityAvailable && (
                  <span className="text-red-500 text-sm">
                    {errors.quantityAvailable.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="thresholdValue"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Threshold Value:
                </label>
                <input
                  type="number"
                  id="thresholdValue"
                  {...register("thresholdValue", { valueAsNumber: true })}
                  min="0"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.thresholdValue && (
                  <span className="text-red-500 text-sm">
                    {errors.thresholdValue.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address.message}
                  </span>
                )}
              </div>
            </div>
          </fieldset>

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

export default InventoryForm;
