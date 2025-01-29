"use client"
import { getCategory } from '@/action/category';
import React,{useState,useEffect} from 'react'
import { Package } from "lucide-react";
import { ImageSlider } from './ImageSlider';
interface categoryProps{
    categoryId:string;
}
const CategoryDetail = ({categoryId}:categoryProps) => {
    const[categoryInfo,setCategoryInfo]=useState<any>(null)
      useEffect(() => {
                async function fetchData() {
            
                    try {
                        const response = await getCategory(categoryId);
                        if (response.success && response.data) {
                            console.log(response.data); 
                            console.log("eeeegg")
                            setCategoryInfo(response.data)
                        } else {
                            console.error("Failed to fetch user data");
                        }
                    } catch (error) {
                        console.error("Failed to fetch data", error);
                    }
                    
                }
                fetchData();
            }, [categoryId]);
        
  return (
    <div>
           <main className="w-full ">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className=" rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-10 ">
            <div className="h-[300px] lg:h-[350px] lg:col-span-6 p-3">
              <ImageSlider images={categoryInfo?.categoryImage ||[]} />
            </div>
            <div className="p-6 lg:p-8 flex flex-col lg:col-span-4">
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                {categoryInfo?.categoryName}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <Package className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">
                  Physical
                </span>
              </div>
              <p className="text-gray-600 mb-6 flex-grow">
                {categoryInfo?.categoryDescription}
              </p>
              <div className="border-t pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Available Products</span>
                  <span className="font-medium text-gray-900">
                    {categoryInfo?.products?.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  )
}

export default CategoryDetail