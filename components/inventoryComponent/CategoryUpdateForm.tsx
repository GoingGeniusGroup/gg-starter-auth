"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, categoryData } from "@/inventorySchema";
import { updateCategory } from "@/action/category"; // Make sure this is imported
import { toast } from "sonner";
import { on } from "events";
import { useRouter } from "next/navigation";

interface CategoryFormProps {
  onCancel: () => void;
  category: categoryData;
  CategoryId: string;
  onCategoryUpdate: (updatedCategory: any) => void;
}

const CategoryUpdateForm = ({
  onCancel,
  category,
  CategoryId,
  onCategoryUpdate,
}: CategoryFormProps) => {

        const router = useRouter();
  
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<categoryData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    // Reset the form with category data when the component is mounted
    reset({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription,
      categoryImage: [], // You can leave this empty for now or prepopulate it if necessary
    });
  }, [category, reset]);

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
      // Call the updateCategory function and pass the CategoryId
      const result = await updateCategory(formData, CategoryId);
      if (result.success) {
        const updatedCategory = {
          ...category,
          categoryName: data.categoryName,
          categoryDescription: data.categoryDescription,
        };
        toast.success("Category updated successfully");
        console.log("Category updated successfully");
        router.push("/dashboard/category")
        onCancel(); // Close the form after success
        onCategoryUpdate(updatedCategory);
      } else {
        toast.error("Failed to update category");
        console.error("Failed to update category");
      }
    } catch (error) {
      toast.error("Error updating category");
      console.error("Error updating category", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg shadow-lg border rounded-lg p-6 space-y-6"
      >
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
          <legend className="text-xl font-semibold text-blue-500 px-2">
            Categories
          </legend>

          <div className="mb-3">
            <label
              htmlFor="categoryName"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Category Name:
            </label>
            <input
              type="text"
              id="categoryName"
              {...register("categoryName")}
              name="categoryName"
              defaultValue={category.categoryName}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.categoryName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.categoryName.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="categoryDescription"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Category Description:
            </label>
            <textarea
              id="categoryDescription"
              {...register("categoryDescription")}
              name="categoryDescription"
              defaultValue={category.categoryDescription}
              rows={3}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.categoryDescription && (
              <p className="text-sm text-red-500 mt-1">
                {errors.categoryDescription.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="categoryImage"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
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
                  onChange={(e) =>
                    field.onChange(Array.from(e.target.files || []))
                  }
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            />

            {errors.categoryImage && (
              <p className="text-sm text-red-500 mt-1">
                {errors.categoryImage.message}
              </p>
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
              Update
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CategoryUpdateForm;
