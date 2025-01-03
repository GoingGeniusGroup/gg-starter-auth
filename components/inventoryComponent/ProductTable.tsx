"use client"
import React,{useState,useEffect} from "react";
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
import { getAllproducts ,deleteProduct} from '@/action/product'
import { Input } from "@/components/ui/input1"
import { LuListFilter } from "react-icons/lu";
import {  BiShow } from 'react-icons/bi';

import { FaEdit, FaTrash,FaPlus,FaFilter } from "react-icons/fa"; 
import { toast } from "sonner";
interface Product {
    id: string; 
    name: string; 
    stockQuantity:number;
    salePrice?: number;
    costPrice?: number;
    category:string[],
    isFeatured:boolean,
    status:boolean,
    description?: string;
  }
interface ProductTableProps {
    products:Product[];
}


  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };


  
const ProductTable = () => {
    const[products,setProducts]=useState<any[]>([])
  
  useEffect(()=>{
     async function fetchProducts(){
       try{
         const response=await getAllproducts()
         if (response.success && response.data) {
           setProducts(response.data);
 
         } else {
           console.error("Failed to fetch products");
         }
       }
       catch(error){
         console.error("failed to fetch products")
       }
     }
     fetchProducts()
   },[])

    const removeProduct=async(productId:string)=>{
      const confirmed=window.confirm("Are you sure you want to delete this product?");
      if(confirmed){
        try{
          const response=await deleteProduct(productId);
          if(response.success){
            setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId));
            toast.success("Product deleted successfully");
          }
          else{
            console.error("Failed to delete product");
            toast.error("Failed to delete product");
          }
        }catch(error){
          console.error("Failed to delete product");
          toast.error("Failed to delete product");
        }
      }
    }
  return (
    <div className="p-2 ">
        <div className="flex justify-between items-center h-[55px] px-4 bg-white my-2 mb-3 rounded">
        <div className="flex items-center py-4 w-1/4 gap-2">
            <Input type="text" placeholder="search"  />
        {/* <input type="text" placeholder="search" className="px-3 py-2 w-80 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 " /> */}
        <button type="button" className="flex items-center justify-center  p-2 rounded hover:bg-gray-300">
          <LuListFilter className="w-5 h-5" />
        </button>
      </div>   
      
      <Link href="/dashboard/product/add">
      <button className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700">
        <FaPlus className="w-4 h-4" /> 
        Add
      </button>
      </Link>
     
       </div>

    
    <Table className="w-full border-collapse border  shadow rounded  bg-white" >
        {/* <TableCaption>A list of your products in inventory.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
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
          {products.map((product,index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell className="text-blue-500">{product.name}</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>{product.costPrice}</TableCell>
                <TableCell>{product.salePrice}</TableCell>
              <TableCell>{product.category && product.category.categoryName}</TableCell>
              <TableCell>{truncateText(product.description ?? "", 20)}</TableCell>
                <TableCell>{product.isFeatured?"Yes":"No"}</TableCell>

              <TableCell>
                <div className="flex space-x-2">
                <button
                    
                    className="text-green-500 hover:text-green-700 text-xl"
                    aria-label="view"
                  >
                    <BiShow />
                  </button>
                  <Link href={`/dashboard/product/update/${product.id}`}>
                  <button
                    className="text-blue-500 hover:text-blue-700 text-xl"
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                  </Link>
        
                 
                
                  <button
                    onClick={()=>removeProduct(product.id)}
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

    
    </div>
  );
};

export default ProductTable;
