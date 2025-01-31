"use client"
import React,{useState,useEffect} from 'react'
import { getProductDetail } from '@/action/product';
import ImageGallery from './ImageGallery';
import {
  Star,
  ShoppingCart,
  Heart,
  Check,
  X,
  MapPin,
  Package,
  Building2,
} from "lucide-react";
interface prodProps{
  productId:string;
}
const ProdDetailPage = ({productId}:prodProps) => {
  const [prodInfo,setProdInfo]=useState<any>(null)   
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
                  async function fetchData() {
                      setLoading(true)
   
                      try {
                          const response = await getProductDetail(productId);
                          if (response.success && response.data) {
                              console.log(response.data); 
                          
                              setProdInfo(response.data)
                          } else {
                              console.error("Failed to fetch  data");
                          }
                      } catch (error) {
                          console.error("Failed to fetch data", error);
                      } finally{
                          setLoading(false)
                      }
                      
                  }
                  fetchData();
              }, [productId]);
              if(loading){
                return(
                  <div>
                    loading data...
                  </div>
                )
              }
  return (
    <main className='w-full p-4 md:p-8'>
            <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className=''>
              <ImageGallery images={prodInfo.imageUrl}/>

              </div>
              <div className='space-y-4'>
              <h1 className="text-3xl font-bold text-gray-900">
                {prodInfo.name}
              </h1>
              <p className="text-lg text-gray-600">By {prodInfo.brand}</p>

              {/* prod rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(prodInfo.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({prodInfo.rating} / 5)
                </span>
              </div>
              
              <div>

            </div>

              </div>
    </div>
        </div>


    </main>
  )
}

export default ProdDetailPage