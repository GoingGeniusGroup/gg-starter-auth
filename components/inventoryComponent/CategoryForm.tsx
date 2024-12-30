"use client"
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, categoryData } from "@/inventorySchema";
import { savecategory } from "@/action/category";
import { revalidatePath } from "next/cache";
import { Toaster, toast } from 'sonner'

interface CategoryFormProps {
  onCancel: () => void;
  onCategoryAdd: (newCategory: any) => void;
}

const CategoryForm = ({ onCancel ,onCategoryAdd}: CategoryFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<categoryData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: categoryData) => {
   
    const formData = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("categoryDescription", data.categoryDescription);
    if (data.categoryImage && data.categoryImage.length > 0) {
      data.categoryImage.forEach((image) => {
        formData.append("categoryImage", image);
      });
    }
    try {
      const result = await savecategory(formData);
      if (result.success && result.data) {
        // alert("Category saved successfully!");
        toast.success('Category has saved successfully!')
        console.log("Saved category:", result.data);
        const newCategory = {
          CategoryId: result.data.id,
          categoryName: result.data.categoryName,
          categoryDescription: result.data.categoryDescription || "",
          categoryType: "PHYSICAL",
          productQuantity: result.data.products ? result.data.products.length : 0,
        };
        onCategoryAdd(newCategory); // Add to parent state
        reset();
        onCancel();
      } else {
        console.error("Validation errors:", result.errors);
        // alert("Validation errors occurred. Check console for details.");
        toast.warning('Validation errors occurred. Check console for details.')
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("Failed to save category");
      toast.error('Failed to save category')
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
          <legend className="text-xl font-semibold text-blue-500 px-2">
            Categories
          </legend>

          <div className="mb-3">
            <label htmlFor="categoryName" className="block text-sm font-semibold text-gray-700">
              Categories Name:
            </label>
            <input
              type="text"
              id="categoryName"
              {...register("categoryName")}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.categoryName && (
              <p className="text-sm text-red-500 mt-1">{errors.categoryName.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="categoryDescription" className="block text-sm font-semibold text-gray-700">
              Category Description:
            </label>
            <textarea
              id="categoryDescription"
              {...register("categoryDescription")}
              rows={3}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.categoryDescription && (
              <p className="text-sm text-red-500 mt-1">{errors.categoryDescription.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="categoryImage" className="block text-sm font-semibold text-gray-700">
              Category Images:
            </label>
            <Controller
              name="categoryImage"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <input
                  type="file"
                  id="categoryImage"
                  accept="image/*"
                  multiple
                  onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
            {errors.categoryImage && (
              <p className="text-sm text-red-500 mt-1">{errors.categoryImage.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
export default CategoryForm;
