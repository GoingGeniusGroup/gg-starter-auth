"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table1";
import Link from "next/link";
import { getAllproducts, deleteProduct } from '@/action/product'
import { Input } from "@/components/ui/input1"
import { LuListFilter } from "react-icons/lu";
import { BiShow } from 'react-icons/bi';
import Image from "next/image";
import { FaEdit, FaTrash, FaPlus, FaFilter } from "react-icons/fa";
import { toast } from "sonner";
import { AiOutlineTable, AiOutlineAppstore } from "react-icons/ai"; // Import icons for table and grid

interface Product {
  id: string;
  name: string;
  stockQuantity: number;
  salePrice?: number;
  costPrice?: number;
  category: string[];
  isFeatured: boolean;
  status: boolean;
  description?: string;
  image?: string;
}

interface ProductTableProps {
  products: Product[];
}

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "N/A";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const ProductTable = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("table"); // State to track view mode
  const[searchQuery,setSearchQuery]=useState("")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getAllproducts();
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Failed to fetch products");
      }
    }
    fetchProducts();
  }, []);

  const removeProduct = async (productId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        const response = await deleteProduct(productId);
        if (response.success) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId));
          toast.success("Product deleted successfully");
        } else {
          console.error("Failed to delete product");
          toast.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Failed to delete product");
        toast.error("Failed to delete product");
      }
    }
  };
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="p-2">
      <div className="flex justify-between items-center dark:bg-black/40 h-[55px] px-4 bg-white my-2 mb-3 rounded">
        <div className="flex items-center py-4 w-1/3 gap-2">
          <Input type="text" placeholder="search by name or category" 
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          />
          <button type="button" className="flex items-center justify-center p-2 rounded hover:bg-gray-300">
            <LuListFilter className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded hover:bg-gray-200  hover:dark:bg-gray-800  ${viewMode === "table" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
          >
            <AiOutlineTable className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded hover:bg-gray-200 hover:dark:bg-gray-800 ${viewMode === "grid" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
          >
            <AiOutlineAppstore className="w-5 h-5" />
          </button>
        </div>

        <Link href="/dashboard/product/add">
          <button className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700">
            <FaPlus className="w-4 h-4" />
            Add
          </button>
        </Link>
      </div>

      {viewMode === "table" && (
        <Table className="w-full border-collapse border dark:bg-black shadow rounded bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>S.N</TableHead>
              <TableCell>Image</TableCell>

              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Cost Price</TableHead>
              <TableHead>Sell Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                 <TableCell>
                                <div className="relative h-12 w-12">
                                  <Image
                                    src={product.imageUrl[0]}
                                    alt={product.name}
                                    className="object-cover rounded-sm"
                                    fill
                                  />
                                </div>
                              </TableCell>
                <TableCell className="text-blue-500">{product.name}</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>{product.costPrice}</TableCell>
                <TableCell>{product.salePrice}</TableCell>
                <TableCell>{product.category && product.category.categoryName}</TableCell>
                <TableCell>{truncateText(product.description ?? "", 20)}</TableCell>
                <TableCell>{product.isFeatured ? "Yes" : "No"}</TableCell>

                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/product/${product.id}`}>
                    <button
                      className="text-green-500 hover:text-green-700 text-xl"
                      aria-label="view"
                    >
                      <BiShow />
                    </button>
                    </Link>
                    
                    <Link href={`/dashboard/product/update/${product.id}`}>
                      <button
                        className="text-blue-500 hover:text-blue-700 text-xl"
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </button>
                    </Link>

                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className=" rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-56">
              <Image 
  src={product.imageUrl[0]} 
  alt={product.name} 
  layout='fill'
  objectFit="contain"
  className="rounded-t-lg"
/>
      
                {product.isFeatured && (
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 mb-2 ">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-slate-50">
                    {product.name}
                  </h3>
                  <span className="text-lg font-semibold text-gray-900  dark:text-slate-50">
                    ${product.salePrice?.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500   dark:text-slate-200 mb-2">{truncateText(product.description ?? "", 50)}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium  bg-gray-200 text-gray-800  ">
                    {product.category && product.category.categoryName}

                  </span>
                  <span className="text-sm text-gray-500  dark:text-slate-200">
                    Stock: {product.stockQuantity}
                  </span>
                </div>
                {/* <div className="flex justify-around mt-4">
                  <Link href={`/dashboard/product/update/${product.id}`}>
                    <button
                      className="text-blue-500 hover:text-blue-700 text-xl"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                  </Link>

                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-red-500 hover:text-red-700 text-xl"
                    aria-label="Delete"
                  >
                    <FaTrash />
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductTable;
