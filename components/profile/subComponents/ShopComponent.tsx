"use client";

import { useState } from "react";
import Image from "next/image";
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

import productdata from "../data/product";

const demodata = [
  {
    productId: "1234567890",
    name: "Lenovo IdeaPad 3i",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJHtIt0p3GmXkfXnps0N5pOvgiGJVMe8kdg&s",
    price: 599.99,
    rating: 4.5,
    reviews: 123,
    categories: ["Laptops", "Electronics"],
    description:
      "Powerful and portable laptop with a 15.6-inch display, 11th Gen Intel Core i5 processor, 8GB RAM, and 256GB SSD.",
    seller: "Lenovo",
    availability: "In stock",
    shipping: {
      estimatedDelivery: "2-3 business days",
      cost: 0,
    },
    variants: [
      {
        color: "Silver",
        size: "15.6-inch",
        price: 599.99,
      },
      {
        color: "Gray",
        size: "15.6-inch",
        price: 629.99,
      },
    ],
  },
  {
    productId: "9876543210",
    name: "Samsung Galaxy S23 Ultra",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCD8HZbnfDH6pK7Wz9_uWmxyltw7zVkst1TQ&s",
    price: 1199.99,
    rating: 4.8,
    reviews: 456,
    categories: ["Smartphones", "Electronics"],
    description:
      "High-end smartphone with a 6.8-inch Dynamic AMOLED 2X display, Qualcomm Snapdragon 8 Gen 2 processor, 12GB RAM, and 512GB storage.",
    seller: "Samsung",
    availability: "In stock",
    shipping: {
      estimatedDelivery: "1-2 business days",
      cost: 10,
    },
    variants: [
      {
        color: "Phantom Black",
        storage: "512GB",
        price: 1199.99,
      },
      {
        color: "Cream",
        storage: "512GB",
        price: 1199.99,
      },
      {
        color: "Green",
        storage: "512GB",
        price: 1199.99,
      },
    ],
  },
  {
    productId: "1011121314",
    name: "Apple AirPods Pro (2nd Generation)",
    imageUrl:
      "https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907.jpg.news_app_ed.jpg",
    price: 249.99,
    rating: 4.7,
    reviews: 789,
    categories: ["Headphones", "Electronics"],
    description:
      "Wireless earbuds with active noise cancellation, transparency mode, and up to 30 hours of battery life.",
    seller: "Apple",
    availability: "In stock",
    shipping: {
      estimatedDelivery: "1-2 business days",
      cost: 0,
    },
    variants: [
      {
        color: "White",
        price: 249.99,
      },
    ],
  },
  {
    productId: "1415161718",
    name: "Sony PlayStation 5 Console",
    imageUrl:
      "https://i5.walmartimages.com/seo/Restored-Sony-PlayStation-5-Digital-Edition-Sony-PS5-Digital-Video-Game-Console-Refurbished_825493ab-d9d7-4e0e-92ce-5e9ee41a0e59.a3f02790fc0611920245c5046aaae481.jpeg",
    price: 499.99,
    rating: 4.6,
    reviews: 1011,
    categories: ["Consoles", "Electronics"],
    description:
      "Next-gen gaming console with ultra-fast SSD, 8-core CPU, and ray tracing capabilities.",
    seller: "Sony",
    availability: "Out of stock",
    shipping: {
      estimatedDelivery: "7-10 business days",
      cost: 20,
    },
    variants: [
      {
        version: "Standard Edition",
        price: 499.99,
      },
      {
        version: "Digital Edition",
        price: 399.99,
      },
    ],
  },
];

const categories = ["Emotes", "Coins", "Sounds"];

export default function ShopComponent() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? productdata.filter((product) =>
        product.category.includes(selectedCategory)
      )
    : productdata;

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
      <h1 className="font-bold px-2 pb-2 text-xl">Shop</h1>
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
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-md">
              <ul className="p-2">
                <li
                  className={`cursor-pointer py-1 ${
                    selectedCategory === null ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleCategoryClick(null)}
                >
                  All
                </li>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`cursor-pointer py-1 ${
                      selectedCategory === category ? "bg-gray-100" : ""
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
                    <div className="h-50 w-full overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="mt-2 p-2">
                      <h2 className="text-md font-medium">{product.name}</h2>
                      <h1 className="text-sm text-gray-500 ">
                        ${product.price}
                      </h1>
                    </div>
                    <div className="absolute left-2 top-2 rounded-full bg-white p-1 border border-gray-200 shadow-md">
                      <span className="text-sm font-bold text-yellow-400">
                        4.9
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
}
