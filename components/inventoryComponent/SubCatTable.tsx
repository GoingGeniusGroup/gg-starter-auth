"use client";
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
import { BiShow } from "react-icons/bi";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getSubCategory } from "@/action/subCategory";

const SubCatTable=()=>{
    const[subs,setSubs]=useState<any[]>([])
     useEffect(() => {
        async function fetchdata() {
          try {
            const response = await getSubCategory();
            if (response.success && response.data) {
              setSubs(response.data);
            } else {
              console.error("Failed to fetch categories");
            }
          } catch (error) {
            console.error("Failed to fetch data", error);
          }
        }
        fetchdata();
      }, []);
    return(
        <div>
        <div className="p-2">
          <div className="flex justify-between items-center h-[55px] px-4 my-2 mb-3 rounded">
            <div className="flex items-center py-4 w-1/4 gap-2">
              <Input type="text" placeholder="Search" />
              <button
                type="button"
                className="flex items-center justify-center p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <LuListFilter className="w-5 h-5" />
              </button>
            </div>
  
            <Link href="/dashboard/subCategory/add">
              <button className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700">
                <FaPlus className="w-4 h-4" />
                Add
              </button>
            </Link>
          </div>
  
          <Table className="w-full border-collapse border shadow rounded">
            <TableHeader>
              <TableRow>
                <TableHead>S.N</TableHead>
                <TableHead> Category</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {subs.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="text-blue-500">{category.name}</TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
}
export default SubCatTable