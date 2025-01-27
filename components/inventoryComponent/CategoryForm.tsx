"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, categoryData } from "@/inventorySchema";
import { savecategory } from "@/action/category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import { useTheme } from "next-themes";
import Image from "next/image";

import "@uploadcare/react-uploader/core.css";

interface CategoryFormProps {
  onCancel: () => void;
}

const CategoryForm = ({ onCancel }: CategoryFormProps) => {
  const router = useRouter();
  const uploadkey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || "";
  const { theme } = useTheme();
  const [allImages, setAllImages] = useState<string[]>([]); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<categoryData>({
    resolver: zodResolver(categorySchema),
  });

  const handleRemoveImage = (index: number) => {
    setAllImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: categoryData) => {
    const formData = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("categoryDescription", data.categoryDescription);

    // Add images to the form data
    allImages.forEach((url) => formData.append("categoryImage", url));

    try {
      const result = await savecategory(formData);
      if (result.success && result.data) {
        toast.success("Category has been saved successfully!");
        reset();
        router.push("/dashboard/category");
        onCancel();
      } else {
        console.error("Validation errors:", result.errors);
        toast.warning("Validation errors occurred. Check console for details.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save category");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg border shadow-lg rounded-lg p-6 space-y-6"
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

        
            <div className="flex gap-4 flex-wrap mt-2 mb-2">
              {allImages.map((url, index) => (
                <div key={index} className="relative">
                <Image
                                    src={url}
                                    alt={`Image ${index + 1}`}
                                    width={96}
                                    height={96}
                                    className="object-cover rounded border"
                                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* File Upload */}
            <FileUploaderRegular
              multiple
              sourceList="local, url, gdrive"
              classNameUploader={theme === "dark" ? "uc-dark" : "uc-light"}
              pubkey={uploadkey}
              imgOnly={true}
              onChange={(event) => {
                const files = event.successEntries || [];
                const urls = files.map((file) => file.cdnUrl);
                setAllImages((prev) => [...prev, ...urls]);
              }}
            />
          </div>

          {/* Submit and Cancel Buttons */}
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
