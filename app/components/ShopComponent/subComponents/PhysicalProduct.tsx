"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import physicalProducts from "../data/physicalProducts";
import { getCategories } from "@/actions/category";
import { Category } from "./types";

export default function PhysicalProduct() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const products = physicalProducts;

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();

      if (data && Array.isArray(data)) {
        const formattedCategories: Category[] = data.map((item) => ({
          id: item.id,
          categoryName: "categoryName" in item ? item.categoryName ?? "" : "",
          categoryDescription:
            "categoryDescription" in item ? item.categoryDescription ?? "" : "",
        }));
        setCategories(formattedCategories);
      } else {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Category and Product Filtering
  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const searchedProducts = filteredProducts.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = product.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || descriptionMatch;
  });

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full rounded-md border px-2 py-2"
        />
      </div>

      {/* Category Slider */}
      <div className="relative">
        <h1 className="font-medium mb-2 flex flex-row items-center gap-2">
          Categories:
        </h1>
        <Carousel className="w-full">
          <CarouselContent>
            {[
              { id: "all", categoryName: "All", categoryDescription: null },
              ...categories,
            ]
              .reduce((result: Category[][], _, index, array) => {
                if (index % 2 === 0) {
                  result.push(array.slice(index, index + 2));
                }
                return result;
              }, [])
              .map((pair, index) => (
                <CarouselItem key={index} className="shrink-0 pb-4">
                  <div className="flex justify-between gap-2">
                    <button
                      className={`w-1/2 h-10 rounded-md text-md font-normal flex items-center justify-center border ${
                        selectedCategory === pair[0]?.categoryName ||
                        (pair[0]?.categoryName === "All" &&
                          selectedCategory === null)
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() =>
                        handleCategoryClick(
                          pair[0]?.categoryName === "All"
                            ? null
                            : pair[0]?.categoryName
                        )
                      }
                    >
                      {pair[0]?.categoryName || "N/A"}
                    </button>
                    {pair[1] && (
                      <button
                        className={`w-1/2 h-10 rounded-md text-md font-normal flex items-center justify-center border ${
                          selectedCategory === pair[1]?.categoryName ||
                          (pair[1]?.categoryName === "All" &&
                            selectedCategory === null)
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        }`}
                        onClick={() =>
                          handleCategoryClick(
                            pair[1]?.categoryName === "All"
                              ? null
                              : pair[1]?.categoryName
                          )
                        }
                      >
                        {pair[1]?.categoryName || "N/A"}
                      </button>
                    )}
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Products Slider */}
      <div className="relative mb-2">
        <Carousel className="w-full">
          <CarouselContent>
            {searchedProducts.map((product) => (
              <CarouselItem key={product.id} className="shrink-0 pb-4">
                <div className="relative overflow-hidden rounded-md bg-white/40 border border-gray-300 shadow-md dark:bg-white">
                  <div className="h-[230px] w-[300px] overflow-hidden rounded-md bg-gray-100 flex justify-center items-center">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={230}
                      height={300}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="mt-2 p-2">
                    <h2 className="text-md font-medium text-gray-700">
                      {product.name}
                    </h2>
                    <h1 className="text-sm text-gray-500 ">{`$${product.price}`}</h1>
                  </div>
                  <div className="p-2 w-full flex justify-center">
                    <Button className="w-full text-md font-normal flex items-center justify-center border">
                      <span>Buy Now</span>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
