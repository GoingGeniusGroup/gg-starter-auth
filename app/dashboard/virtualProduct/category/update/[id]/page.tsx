"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { virtualCategorySchema } from '@/inventorySchema';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { getVirtualCategoryDetail, updateVirtualCategory } from '@/action/virtualCategory';
interface Vcategory {
    id:string
    name: string;
  }

  interface UpdateProps{
    params:{
        id:string
    }
  }
const updateCategory:React.FC<UpdateProps> = ({params}) => {
      const router = useRouter();
      const{id}=params
      const[category,setCategory]=useState<Vcategory>()
     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<Vcategory>({
        resolver: zodResolver(virtualCategorySchema),
      });
  useEffect(() => {
    async function fetchCategory() {
      try {
        const result = await getVirtualCategoryDetail(id);
        if (result.success && result.data) {
          setCategory(result.data);
        } else {
          console.error("Failed to fetch product:", result.message);
        }
      } catch (error) {
        console.error("failed to fetch product");
      }
    }
    fetchCategory()
  },[id])

      useEffect(()=>{
        if(category){
            reset({
                name:category.name
            })
        }
      },[category,reset])

      const onSubmit=async(data:Vcategory)=>{
        const formData=new FormData()
        formData.append("name",data.name)
        try{
          const result=await updateVirtualCategory(formData,id);
            if (result?.success && result.data) {
                  toast.success("category updated successfully");
                  router.push("/dashboard/virtualProduct/category");
                } else {
                  toast.error("Failed to update category");
                  console.error("Failed to update category");
                }
        }
        catch (error) {
              toast.error("Error updating category");
              console.error("Error updating category", error);
            }
      }
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
  )
}

export default updateCategory