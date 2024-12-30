import React from "react";
import { z } from "zod";
import { useActionState } from "react"; // Ensure you have React 19 or later for useActionState
import { categorySchema, categoryData } from "@/schema";

interface CategoryFormProps {
  onCancel: () => void;
}


const submitCategoryAction = async (prevState: any, formData: FormData) => {
  const data = {
    categoryName: formData.get("categoryName") as string,
    categoryDescription: formData.get("categoryDescription") as string,
    categoryImage: formData.getAll("categoryImage") as File[],
  };

  try {
    // Zod validation
    categorySchema.parse(data);
    
    // Add/post to DB logic here (e.g., API call)

    return { success: true, message: "Category added successfully" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Collect errors from Zod validation
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};

const CategoryForm = ({ onCancel }: CategoryFormProps) => {
  const [state, formAction] = useActionState<categoryData>( submitCategoryAction, {
    success: false,
    errors: {},
  });

  return (
    <div className="flex justify-center items-center">
      <form action={formAction} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-6">
        <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
          <legend className="text-xl font-semibold text-blue-500 px-2">Categories</legend>
          <div className="mb-3">
            <label htmlFor="categoryName" className="block text-sm font-semibold text-gray-700">Categories Type:</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.categoryName && <p className="text-red-500">{state.errors.categoryName}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="categoryDescription" className="block text-sm font-semibold text-gray-700">Category Description:</label>
            <textarea
              id="categoryDescription"
              name="categoryDescription"
              rows={3}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.categoryDescription && <p className="text-red-500">{state.errors.categoryDescription}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="categoryImage" className="block text-sm font-semibold text-gray-700">Category Image:</label>
            <input
              type="file"
              id="categoryImage"
              name="categoryImage"
              accept="image/*"
              required
              multiple // Allow multiple file uploads if needed
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.errors?.categoryImage && <p className="text-red-500">{state.errors.categoryImage}</p>}
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
          {/* Success/Error Message */}
          {state.success && <p className="text-green-500 mt-2">{state.message}</p>}
          {!state.success && state.message && <p className="text-red-500 mt-2">{state.message}</p>}
        </fieldset>
      </form>
    </div>
  );
};

export default CategoryForm;
