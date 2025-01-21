"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import { getCategories } from "@/actions/virtualCategory";
import { getProducts } from "@/app/actions/virtualProduct";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { CartItem } from "./subComponents/types";
import CartSheet from "./subComponents/CartSheet";
import { VirtualProduct } from "./subComponents/types";
import { VirtualCategory } from "./subComponents/types";
import ToggleButton from "./subComponents/ToggleButton";
import PhysicalProduct from "./subComponents/PhysicalProduct";
import { Card } from "../ui/card";

export default function ShopComponent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<VirtualCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<VirtualProduct[]>([]);
  const [isToggleActive, setIsToggleActive] = useState(false);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data: VirtualCategory[] = await getCategories();
      if (data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      const data: VirtualProduct[] = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Category and Product Filtering
  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => {
        const category = categories.find(
          (cat) => cat.id === product.categoryId
        );
        return category && category.name === selectedCategory;
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

  // Remove from Cart
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
      <div className="h-full p-4 overflow-auto pt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-semibold dark:text-gray-300 text-2xl">
              {isToggleActive ? "Virtual Shop" : "Shop"}
            </h1>
          </div>
          <div className="relative flex flex-row items-center gap-4">
            <ToggleButton setActiveState={setIsToggleActive} />
            <FaShoppingCart
              className="text-2xl cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            />
            {totalItems > 0 && (
              <div className="absolute top-[-3px] right-3 h-4 w-4 bg-red-500 text-white flex items-center justify-center rounded-full text-[0.8rem]">
                {totalItems}
              </div>
            )}
          </div>
        </div>
        {isToggleActive ? (
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
                  {[{ id: "all", name: "All" }, ...categories]
                    .reduce((result: VirtualCategory[][], _, index, array) => {
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
                              selectedCategory === pair[0]?.name ||
                              (pair[0]?.name === "All" &&
                                selectedCategory === null)
                                ? "bg-black text-white"
                                : "bg-white text-black"
                            }`}
                            onClick={() =>
                              handleCategoryClick(
                                pair[0]?.name === "All" ? null : pair[0]?.name
                              )
                            }
                          >
                            {pair[0]?.name || "N/A"}
                          </button>
                          {pair[1] && (
                            <button
                              className={`w-1/2 h-10 rounded-md text-md font-normal flex items-center justify-center border ${
                                selectedCategory === pair[1]?.name ||
                                (pair[1]?.name === "All" &&
                                  selectedCategory === null)
                                  ? "bg-black text-white"
                                  : "bg-white text-black"
                              }`}
                              onClick={() =>
                                handleCategoryClick(
                                  pair[1]?.name === "All" ? null : pair[1]?.name
                                )
                              }
                            >
                              {pair[1]?.name || "N/A"}
                            </button>
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
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
                          <Button
                            className="w-full text-md font-normal flex items-center justify-center border"
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
              </Carousel>
            </div>
          </div>
        ) : (
          <PhysicalProduct />
        )}

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
