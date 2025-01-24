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

import { getVirtualCategories } from "@/actions/virtualCategory";
import { getVirtualProducts } from "@/app/actions/virtualProduct";
import { getCategories } from "@/actions/category";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { CartItem, Category } from "./subComponents/types";
import CartSheet from "./subComponents/CartSheet";
import { VirtualProduct } from "./subComponents/types";
import { VirtualCategory } from "./subComponents/types";
import ToggleButton from "./subComponents/ToggleButton";
import physicalProducts from "./data/physicalProducts";

export default function ShopComponent() {
  // Physical Shop
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const products = physicalProducts;

  // Virutal Shop
  const [selectedVirtualCategory, setSelectedVirtualCategory] = useState<
    string | null
  >(null);
  const [virtualCategories, setVirtualCategories] = useState<VirtualCategory[]>(
    []
  );
  const [virtualSearchTerm, setVirtualSearchTerm] = useState("");
  const [virtualProducts, setVirtualProducts] = useState<VirtualProduct[]>([]);
  const [isToggleActive, setIsToggleActive] = useState(false);

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

  // Fetch Virtual Categories
  useEffect(() => {
    const fetchVirtualCategories = async () => {
      const data: VirtualCategory[] = await getVirtualCategories();
      if (data) {
        setVirtualCategories(data);
      }
    };
    fetchVirtualCategories();
  }, []);

  // Fetch Virtual Products
  useEffect(() => {
    const fetchVirtualProducts = async () => {
      const data: VirtualProduct[] = await getVirtualProducts();
      setVirtualProducts(data);
    };
    fetchVirtualProducts();
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

  // Virutal Category and Virtual Product Filtering
  const handleVirtualCategoryClick = (virtualCategory: string | null) => {
    setSelectedVirtualCategory(virtualCategory);
  };

  const handleVirtualSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVirtualSearchTerm(event.target.value);
  };

  const filteredVirtualProducts = selectedVirtualCategory
    ? virtualProducts.filter((product) => {
        const virtualCategory = virtualCategories.find(
          (cat) => cat.id === product.categoryId
        );
        return (
          virtualCategory && virtualCategory.name === selectedVirtualCategory
        );
      })
    : virtualProducts;

  const searchedVirtualProducts = filteredVirtualProducts.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(virtualSearchTerm.toLowerCase());
    const descriptionMatch = product.description
      .toLowerCase()
      .includes(virtualSearchTerm.toLowerCase());
    return nameMatch || descriptionMatch;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (productId: string) => {
    const allProducts = [...products, ...virtualProducts];
    const product = allProducts.find((p) => p.id === productId);

    if (!product) {
      console.error("Product not found");
      return;
    }

    const isVirtualProduct = "type" in product;
    const productType = isVirtualProduct ? "virtual" : "physical";

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex > -1) {
        const updatedCart = prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return updatedCart;
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images,
          productType,
          quantity: 1,
        };
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];

        if (existingItem.quantity > 1) {
          updatedCart[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity - 1,
          };
        } else {
          updatedCart.splice(existingItemIndex, 1);
        }

        return updatedCart;
      }

      return prevCart;
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
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
                value={virtualSearchTerm}
                onChange={handleVirtualSearchChange}
                className="w-full rounded-md border px-2 py-2"
              />
            </div>

            {/* Virtual Category Slider */}
            <div className="relative">
              <h1 className="font-medium mb-2 flex flex-row items-center gap-2">
                Categories:
              </h1>
              <Carousel className="w-full">
                <CarouselContent>
                  {[{ id: "all", name: "All" }, ...virtualCategories]
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
                              selectedVirtualCategory === pair[0]?.name ||
                              (pair[0]?.name === "All" &&
                                selectedVirtualCategory === null)
                                ? "bg-black text-white"
                                : "bg-white text-black"
                            }`}
                            onClick={() =>
                              handleVirtualCategoryClick(
                                pair[0]?.name === "All" ? null : pair[0]?.name
                              )
                            }
                          >
                            {pair[0]?.name || "N/A"}
                          </button>
                          {pair[1] && (
                            <button
                              className={`w-1/2 h-10 rounded-md text-md font-normal flex items-center justify-center border ${
                                selectedVirtualCategory === pair[1]?.name ||
                                (pair[1]?.name === "All" &&
                                  selectedVirtualCategory === null)
                                  ? "bg-black text-white"
                                  : "bg-white text-black"
                              }`}
                              onClick={() =>
                                handleVirtualCategoryClick(
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

            {/* Virtual Products Slider */}
            <div className="relative mb-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {searchedVirtualProducts.map((product) => (
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
                          <h1 className="text-sm text-gray-500 ">
                            ${product.price}
                          </h1>
                        </div>
                        <div className="p-2 w-full flex justify-center">
                          <Button
                            className="w-full mt-2"
                            onClick={() => addToCart(product.id)}
                          >
                            Buy Now
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
                    {
                      id: "all",
                      categoryName: "All",
                      categoryDescription: null,
                    },
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
                          <Button
                            onClick={() => addToCart(product.id)}
                            className="w-full text-md font-normal flex items-center justify-center border"
                          >
                            <span>Buy Now</span>
                            <span
                              className={`ml-2 text-sm text-white-700 bg-blue-800 px-2 py-1 rounded-md min-w-[30px] text-center ${
                                cart.some((item) => item.id === product.id)
                                  ? "block"
                                  : "opacity-0"
                              }`}
                            >
                              {cart.some((item) => item.id === product.id)
                                ? cart.find((item) => item.id === product.id)
                                    ?.quantity
                                : ""}
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
        )}

        <CartSheet
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
}
