"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

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
    categories: ["Gaming Consoles", "Electronics"],
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

const categories = [
  "Laptops",
  "Smartphones",
  "Headphones",
  "Consoles",
  "Electronics",
];

export default function ShopComponentV1() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? demodata.filter((product) =>
        product.categories.includes(selectedCategory)
      )
    : demodata;

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
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="-mt-4 w-full rounded-md border bg-black/50 px-3 py-2 text-white focus:outline-none dark:border-purple-700 dark:bg-purple-950/20 dark:text-purple-200"
        />
      </div>
      {/* Carousel */}
      <div className="relative mb-4">
        <div className="flex gap-2 overflow-auto">
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            scrollbar={{ draggable: true, hide: false }}
            modules={[Scrollbar]}
          >
            <SwiperSlide className="shrink-0 pb-4">
              <button
                className={`w-full justify-center rounded-md  p-2  ${
                  selectedCategory === null
                    ? " border bg-black/20 text-white dark:border-purple-600"
                    : " bg-gray-200 text-black dark:bg-purple-800/30 dark:text-gray-200"
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                All
              </button>
            </SwiperSlide>
            {categories.map((category) => (
              <SwiperSlide key={category} className="shrink-0 pb-4">
                <button
                  className={`w-full justify-center rounded-md p-2 ${
                    selectedCategory === category
                      ? " border bg-black/20 text-white dark:border-purple-600"
                      : " bg-gray-200 text-black dark:bg-purple-800/30 dark:text-gray-200"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="-mt-2 grid grid-cols-2 gap-4">
        {searchedProducts.map((product) => (
          <div
            key={product.productId}
            className="relative overflow-hidden rounded-md bg-white/40 shadow-md dark:bg-white"
          >
            <div className="h-24 w-full overflow-hidden rounded-md bg-white/40 shadow-md dark:bg-purple-800/30">
              <Image
                src={product.imageUrl}
                unoptimized
                alt={product.name}
                width={200}
                height={100}
                layout="responsive"
                className="object-cover"
              />
            </div>
            <div className="h-14 w-full bg-gray-300 p-1 backdrop-blur-sm dark:bg-purple-600/40">
              <h1 className="font-medium text-black">${product.price}</h1>
              <h2 className="text-sm text-black">
                {product.name.slice(0, 10)}...
              </h2>
              {/* <p className='mt-1 text-sm text-gray-600'>{product.description.slice(0, 22)}...</p> */}
            </div>
            <div className="absolute bottom-14 right-1">
              <span className="text-sm font-bold text-yellow-400 drop-shadow">
                ({product.rating}/5)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
