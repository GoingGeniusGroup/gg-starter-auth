"use client"
import React,{useEffect,useState} from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useTheme } from "next-themes";
import { subCatSchema } from '@/inventorySchema';
import { saveSubCategory } from "@/action/subCategory";

interface SubCat{
    name:string;
    imageUrl:string
}
const SubCategoryForm = () => {
    const uploadkey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
    const router = useRouter();
  
  const { theme } = useTheme();
 const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubCat>({
    resolver: zodResolver(subCatSchema),
  });
 const onSubmit = async (data: SubCat) => {
    console.log(data);
  
    const formData = new FormData();
    formData.append("name", data.name);

    if (uploadedUrl) {
      formData.append("imageUrl", uploadedUrl);
    }
    
    try {
      const result = await saveSubCategory(formData);
      console.log(result);
      if (result.success && result.data) {
        toast.success("Sub category has been saved successfully!");
        reset();
        router.push("/dashboard/subCategory");
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
    <div>
         <div className="flex  py-10 justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl border shadow-lg rounded-lg p-6 space-y-6"
        >
          <fieldset className="my-1 border border-blue-500 rounded-lg p-4">
            <legend className="text-xl font-semibold text-blue-500 px-2">
              Sub Category
            </legend>
            <div className="mb-3">
              <label
                htmlFor="categoryName"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Sub-Category Name:
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )} */}
            </div>
             <div className="mb-4">
                            <label
                              htmlFor="source"
                              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                            >
                              Category Image
                            </label>
                            <FileUploaderRegular
                              sourceList="local, url, gdrive"
                              classNameUploader={theme === "dark" ? "uc-dark" : "uc-light"}
                              pubkey={`${uploadkey}`}
                              imgOnly={true}
                              onChange={(event) => {
                                const file = event.successEntries[0];
                                if (file) {
                                  setUploadedUrl(file.cdnUrl);
                                  register('imageUrl', { value: file.cdnUrl })
                                }
                              }}
                            />
                            {/* {errors.source && (
                              <p className="text-sm text-red-500 mt-1">
                                {errors.source.message}
                              </p>
                            )} */}
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
  )
}

export default SubCategoryForm