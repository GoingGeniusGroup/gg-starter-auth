import React from "react";
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

import { Input } from "@/components/ui/input"
import { LuListFilter } from "react-icons/lu";
import {  BiShow } from 'react-icons/bi';

import { FaEdit, FaTrash,FaPlus,FaFilter } from "react-icons/fa"; 
interface Product {
    pd_id: number; 
    productId: string; 
    name: string; 
    quantity:number;
    unit: string; 
    unitPrice: number; 
    category:string,
    description?: string;
  }

  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };


  
const InventProdTable = () => {
  const products = [
    {
      pd_id: 1,
      productId: "MOB-001",
      name: "ABC Mobile Black",
      quantity:20,
      unit: "Piece",
      unitPrice: 500,
      category:"Physical",
      description: "Smartphone with 64GB storage",
    },
    {
      pd_id: 2,
      productId: "MOB-002",
      name: "ABC Mobile Red",
   
      unit: "Piece",
      unitPrice: 500,
      quantity:20,
      category:"Physical",
      description: "Smartphone with 64GB storage",
    },
    {
        pd_id: 3,
        productId: "ABC-3",
        name: "ABC Mobile blue",
        unit: "Piece",
        unitPrice: 5000,
        quantity:6,
        category:"Physical",
        description: "Smartphone",
      },
      {
        pd_id: 4,
        productId: "MOB-003",
        name: "ABC Mobile Blue",
        unit: "Piece",
        unitPrice: 550,
        quantity:20,
        category:"Physical",
        description: "Smartphone with 64GB storage and AMOLED display",
      },
      {
        pd_id: 5,
        productId: "XYZ-001",
        name: "XYZ Laptop Silver",
        unit: "Piece",
        unitPrice: 1000,
        quantity:20,
        category:"Physical",
        description: "Laptop with Intel i5 processor and 256GB SSD",
      },
      {
        pd_id: 6,
        productId: "AMB-56",
        name: "Ambuja Cement",
        quantity:20,
        unit: "Sack",
        unitPrice: 900,
        category:"Physical",
        description: "Ordinary portland cement",
      },
      {
        pd_id: 7,
        productId: "WHT-12",
        name: "Gyan chakki Aata",
        unit: "Kg",
        unitPrice: 90,
        quantity:20,
        category:"Physical",
        description: "Polish white wheat powder",
      },
  ];

 

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
      
      <Link href="/add-product">
      <button className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700">
        <FaPlus className="w-4 h-4" /> 
        Add
      </button>
      </Link>
     
       </div>

    
    <Table className="w-full border-collapse border  shadow rounded  bg-white" >
        <TableCaption>A list of your products in inventory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Unit Price(Rs)</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product,index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{product.productId}</TableCell>
              <TableCell className="text-blue-500">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.unit}</TableCell>
              <TableCell className="text-green-500">{product.unitPrice.toFixed(2)}</TableCell>

              <TableCell>{truncateText(product.description, 20)}</TableCell>
            

              <TableCell>
                <div className="flex space-x-2">
                <button
                    
                    className="text-green-500 hover:text-green-700 text-xl"
                    aria-label="view"
                  >
                    <BiShow />
                  </button>
        
                  <button
                    
                    className="text-blue-500 hover:text-blue-700 text-xl"
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                
                  <button
                    
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

export default InventProdTable;
