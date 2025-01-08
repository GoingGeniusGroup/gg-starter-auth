"use client"
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table1";
import Link from "next/link";
import { Input } from "@/components/ui/input1";
import { LuListFilter } from "react-icons/lu";
import { BiShow } from 'react-icons/bi';
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; 
import { deleteVirtualCategory, getVirtualCategory } from "@/action/virtualCategory";
import { toast } from "sonner";

interface VCategory {
  name: string;
  id: string;
}

const VirtualCategoryTable = () => {
  const [categories, setCategories] = useState<VCategory[]>([]);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await getVirtualCategory();
        if (response.success && response.data) {
          setCategories(response.data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchInventory();
  }, []);
  const removeCategory=async(categoryId:string)=>{
    const confirmed=window.confirm("Are you sure you want to delete this category?");
    if(confirmed){
      try{
        const response=await deleteVirtualCategory(categoryId);
        if(response.success){
          setCategories((prev)=>prev.filter((cat)=>cat.id!==categoryId))
          toast.success("category deleted successfully")
        }
        else{
          console.error("Failed to delete category")
          toast.error("Failed to delete category")
        }
      }
      catch(error){
        console.error("Failed to delete category")
        toast.error("Failed to delete category")
      }
    }
   }

  return (
    <div>
      <div className="p-2">
        <div className="flex justify-between items-center h-[55px] px-4 bg-white my-2 mb-3 rounded">
          <div className="flex items-center py-4 w-1/4 gap-2">
            <Input type="text" placeholder="Search" />
            <button type="button" className="flex items-center justify-center p-2 rounded hover:bg-gray-300">
              <LuListFilter className="w-5 h-5" />
            </button>
          </div>
          
          <Link href="/dashboard/virtualProduct/category/add">
            <button className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700">
              <FaPlus className="w-4 h-4" /> 
              Add
            </button>
          </Link> 
        </div>

        <Table className="w-full border-collapse border shadow rounded bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>S.N</TableHead>
              <TableHead>Virtual Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-blue-500">{category.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="text-green-500 hover:text-green-700 text-xl" aria-label="View">
                      <BiShow />
                    </button>
                    <Link href={`/dashboard/virtualProduct/category/update/${category.id}`}>
                    <button className="text-blue-500 hover:text-blue-700 text-xl" aria-label="Edit">
                      <FaEdit />
                    </button>
                    </Link>
                  
                    <button
                    onClick={()=>removeCategory(category.id)}
                    className="text-red-500 hover:text-red-700 text-xl" aria-label="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VirtualCategoryTable;

