"use client";
import React, { useState, useEffect } from "react";
import { getProductDetail } from "@/action/product";
import ImageGallery from "./ImageGallery";
import ProdPrices from "./ProdPrices";
import BeatLoader from "react-spinners/BeatLoader"; 

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
import { ProdReview } from "./ProdReview";
interface prodProps {
  productId: string;
}
const prodReview=
   [
    {
      id: 1,
      user: "Hari Bahadur.",
      rating: 5,
      comment: "Excellent product quality!,received in good condition",
      date: "2024-10-15",
    },
    {
      id: 2,
      user: "Sam",
      rating: 3,
      comment: "Good but a bit pricey",
      date: "2024-10-10",
    },
    {
      id: 3,
      user: "Ram",
      rating: 4,
      comment: "very good products,received within a day",
      date: "2024-10-10",
    },
  ]


const ProdDetailPage = ({ productId }: prodProps) => {
  const [prodInfo, setProdInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await getProductDetail(productId);
        if (response.success && response.data) {
          console.log(response.data);

          setProdInfo(response.data);
        } else {
          console.error("Failed to fetch  data");
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productId]);
  if (loading) {
    return (
      <div className="flex justify-center items-center my-20 h-full">
                             <BeatLoader color="#123abc" loading={loading} size={16} /> 
                    </div>
    )
  }
  return (
    <main className="w-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="">
            <ImageGallery images={prodInfo.imageUrl} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">
              {prodInfo.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-200">By {prodInfo.brand}</p>
          
         
            <div className="flex items-center gap-3">
                 {/* prod rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(prodInfo.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-slate-300">({prodInfo.rating} / 5)</span>
            </div>
            <div className="px-2">
            {prodInfo?.isFeatured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Featured
                </span>
              )}
            </div>
            </div>

            <ProdPrices
              salePrice={prodInfo.salePrice}
              costPrice={prodInfo.costPrice}
              discount={prodInfo.discount}
          
            />
            <div className="flex items-center mt-2 gap-2">
              {prodInfo.status ? (
                <>
                  <Check className="text-green-500" />
                  <span className="text-green-500">
                    In Stock ({prodInfo.stockQuantity} available)
                  </span>
                </>
              ) : (
                <>
                  <X className="text-red-500" />
                  <span className="text-red-500">Out of Stock</span>
                </>
              )}
            </div>
            <p className="text-gray-700 dark:text-slate-100">{prodInfo.description}</p>
              <div className="space-y-2">
              <p className="text-gray-600 dark:text-slate-200">Category: {prodInfo.category && prodInfo.category.categoryName}</p>
              </div>
          </div>
        </div>
        <div className="space-y-8 mt-4 border-t border-gray-200 pt-4">
  <div className="flex flex-col md:flex-row md:gap-6">
    <div className="flex items-start gap-3 md:w-1/2">
      <MapPin className="w-5 h-5 text-gray-500 dark:text-slate-300 mt-1" />
      <div>
        <h3 className="font-medium text-gray-900 dark:text-slate-50">Inventory Location</h3>
        <p className="text-gray-600 dark:text-slate-200">{prodInfo.inventory?.address}</p>

      </div>
    </div>
    <div className="flex items-start gap-3 md:w-1/2">
      <Building2 className="w-5 h-5 text-gray-500 mt-1 dark:text-slate-300" />
      <div>
        <h3 className="font-medium text-gray-900 dark:text-slate-50">Supplier Information</h3>
        <p className="text-gray-600 dark:text-slate-200">{prodInfo.Supplier?.supplierName}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          {/* <span>ID: {prodInfo.Supplier?.id}</span> */}
          <span className="mx-2">•</span>
          {/* <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> */}
          <span>{prodInfo.Supplier?.rating}</span>
        </div>
      </div>
    </div>
  </div>
</div>

        <div className="mt-12">
          <ProdReview reviews={prodReview} />
        </div>

      </div>
    </main>
  );
};

export default ProdDetailPage;
