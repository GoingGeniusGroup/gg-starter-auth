"use client"
import { getCategory } from '@/action/category';
import React,{useState,useEffect} from 'react'
import { Package } from "lucide-react";
import { ImageSlider } from './ImageSlider';
import BeatLoader from "react-spinners/BeatLoader"; 
import CatProdTable from './CatProdTable';

interface categoryProps{
    categoryId:string;
}
const CategoryDetail = ({categoryId}:categoryProps) => {
    const[categoryInfo,setCategoryInfo]=useState<any>(null)
            const [loading, setLoading] = useState<boolean>(true)
    
      useEffect(() => {
                async function fetchData() {
                    setLoading(true)

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
                    } finally{
                        setLoading(false)
                    }
                    
                }
                fetchData();
            }, [categoryId]);
            if (loading) {
                return (
                    <div className="flex justify-center items-center my-20 h-full">
                             <BeatLoader color="#123abc" loading={loading} size={16} /> 
                    </div>
                );
            }
        
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
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-slate-50 mb-4">
                {categoryInfo?.categoryName}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <Package className="h-5 w-5 text-gray-500 dark:text-slate-200" />
                <span className="text-gray-600 dark:text-slate-100">
                  Physical
                </span>
              </div>
              <p className="text-gray-600 dark:text-slate-200 mb-6 flex-grow">
                {categoryInfo?.categoryDescription}
              </p>
              <div className="border-t pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-200">Products In This Category:</span>
                  <span className="font-medium text-gray-900 dark:text-slate-50">
                    {categoryInfo?.products?.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div className='p-4'>
    <h1 className="text-2xl px-3 font-semibold text-gray-900 dark:text-slate-50 mb-4">
         Products   
      </h1>
      {categoryInfo.products.length>0 ?    <CatProdTable products={categoryInfo.products}/>
  : <>
  <h2 className='px-4'>No Products in this Category </h2>
  </> }

    </div>
    </div>
  )
}

export default CategoryDetail