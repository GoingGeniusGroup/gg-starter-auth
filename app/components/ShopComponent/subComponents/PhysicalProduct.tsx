"use client";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import physicalProducts from "../data/physicalProducts";

export default function PhysicalProduct() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const products = physicalProducts;

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category === "All" ? null : category);
    setIsDropdownOpen(false);
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
    <>
      <div>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-md border px-2 py-2"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative mb-4">
          <div
            className={`w-1/2 flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 ${
              isDropdownOpen ? "border-blue-500" : ""
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedCategory || "Categories"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-[#020b24] shadow-md">
              <ul className="p-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`cursor-pointer py-1 px-2 ${
                      selectedCategory === category
                        ? "bg-gray-100 dark:bg-gray-900 dark:text-gray-300"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Products Slider */}
        <div className="relative mb-4">
          <Carousel className="w-full">
            <CarouselContent>
              {searchedProducts.map((product) => (
                <CarouselItem key={product.id} className="shrink-0 pb-4">
                  <div className="relative overflow-hidden rounded-md bg-white/40 border border-gray-300 shadow-md dark:bg-white">
                    <div className="h-50 w-full overflow-hidden rounded-md bg-gray-100 flex justify-center">
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
                      <h1 className="text-sm text-gray-500 ">
                        ${product.price}
                      </h1>
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
    </>
  );
}
