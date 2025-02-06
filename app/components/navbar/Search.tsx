"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import products from "../ShopComponent/data/physicalProducts";
// import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="relative w-full max-w-md">
        <Input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FiSearch className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500" />
      </div>
      {searchQuery && (
        <div className="absolute left-0 right-0 mt-10 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md"
              >
                {product.name}
              </div>
            ))
          ) : (
            <p className="p-2 text-gray-500 dark:text-gray-300">
              No results found.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
