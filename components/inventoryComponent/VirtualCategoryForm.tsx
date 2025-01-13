"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { virtualCategorySchema } from '@/inventorySchema';
import { saveVirtualCategory } from '@/action/virtualCategory';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";


interface Vcategory {
  name: string;
}

const VirtualCategoryForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Vcategory>({
    resolver: zodResolver(virtualCategorySchema),
  });

  const onSubmit = async (data: Vcategory) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      
      const result = await saveVirtualCategory(formData);
      
      if (result.success && result.data) {
        toast.success('Category has saved successfully!');
        console.log("Saved category:", result.data);
        reset();
        router.push("/dashboard/virtualProduct/category")
      } else {
        console.error("Validation errors:", result.errors);
        toast.warning('Validation errors occurred. Check console for details.');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Failed to save category');
    }
  };

  return (
    <div>
      <div className="flex  py-10 bg-gray-100 justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}  className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
          <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
            <legend className="text-xl font-semibold text-blue-500 px-2">
              Virtual Categories
            </legend>
            <div className="mb-3">
              <label htmlFor="categoryName" className="block text-sm font-semibold text-gray-700">
                Categories Name:
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>
          </fieldset>
          <button
            type="submit"
            className="w-full p-2 my-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VirtualCategoryForm;
