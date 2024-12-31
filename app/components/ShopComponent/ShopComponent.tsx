"use client";
import { useState, useEffect } from "react";
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

import { getCategories } from "@/actions/category";
import { getProducts } from "@/actions/virtual product";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { CartItem } from "./subComponents/types";
import CartSheet from "./subComponents/CartSheet";

export default function ShopComponent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      if (data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Category and Product Filtering
  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => {
        const category = categories.find(
          (cat) => cat.id === product.categoryId
        );
        return category && category.categoryName === selectedCategory;
      })
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

  // Add to Cart
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: string) => {
    const productType = "virtual";
    const cartKey = `${productType}_${productId}`;
    console.log(cartKey);
    setCart((prevCart) => ({
      ...prevCart,
      [cartKey]: (prevCart[cartKey] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    const productType = "virtual";
    const cartKey = `${productType}_${productId}`;
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[cartKey] > 1) {
        newCart[cartKey]--;
      } else {
        delete newCart[cartKey];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const cartItems: CartItem[] = Object.entries(cart).map(([key, quantity]) => {
    const [productType, productId] = key.split("_");
    const product = products.find((p) => p.id === productId);
    return { ...product!, quantity, productType };
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="h-full p-4 overflow-auto bg-white pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-semibold text-2xl">Virtual Shop</h1>
          </div>
          <div onClick={() => setIsCartOpen(true)} className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
            {totalItems > 0 && (
              <div className="absolute top-[-3px] right-3 h-4 w-4 bg-red-500 text-white flex items-center justify-center rounded-full text-[0.8rem]">
                {totalItems}
              </div>
            )}
          </div>
        </div>

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
                      key={category.id}
                      className={`cursor-pointer py-1 ${
                        selectedCategory === category.categoryName
                          ? "bg-gray-100"
                          : ""
                      }`}
                      onClick={() => handleCategoryClick(category.categoryName)}
                    >
                      {category.categoryName}
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
                          src={product.ImageUrl[0]}
                          alt={product.name}
                          width={230}
                          height={300}
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
                          {product.ratings}
                        </span>
                      </div>
                      <div className="p-2 w-full flex justify-center">
                        <Button
                          className="w-full text-md font-normal flex items-center justify-center"
                          onClick={() => {
                            addToCart(product.id);
                          }}
                        >
                          <span>Buy Now</span>
                          <span
                            className={`ml-2 px-2 py-1 text-sm font-medium rounded-md ${
                              cart[`virtual_${product.id}`] > 0
                                ? "text-white bg-blue-500"
                                : "invisible"
                            }`}
                          >
                            {cart[`virtual_${product.id}`] || 0}
                          </span>
                        </Button>
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

        <CartSheet
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
}
