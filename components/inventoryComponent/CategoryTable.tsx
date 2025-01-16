"use client";
import React, { useState, useEffect, use } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table1";
import { getAllCategories } from "@/action/category";
import { Input } from "@/components/ui/input1";
import { LuListFilter } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Category {
  CategoryId: number;
  categoryName: string;
  categoryDescription: string;
  products: string;
}
interface CategoryTableProps {
  updatedValue: Category[];
  onAddClick: () => void;
  onEditClick: (category: any) => void;
  onDeleteClick: (categoryId: any) => void;
}
const CategoryTable = ({
  onAddClick,
  onEditClick,
  updatedValue,
  onDeleteClick,
}: CategoryTableProps) => {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getAllCategories();
        if (response.success && response.data) {
          setCategory(response.data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("failed to fetch categories");
      }
    };
    fetchCategory();
  }, []);
  useEffect(() => {
    setCategory(updatedValue);
  }, [updatedValue]);

  return (
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

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700"
        >
          <FaPlus className="w-4 h-4" />
          Add
        </button>
      </div>

      <Table className=" w-full border-collapse border shadow rounded">
        {/* <TableCaption>A list of Category Type.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            {/* <TableHead>Category Id</TableHead> */}
            <TableHead>Category Name</TableHead>
            <TableHead>Category Type</TableHead>
            <TableHead>Category Description</TableHead>
            <TableHead>Number of Product</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.map((category, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              {/* <TableCell>{category.id}</TableCell> */}
              <TableCell className="text-blue-500">
                {category.categoryName}
              </TableCell>
              <TableCell>Physical</TableCell>
              <TableCell>{category.categoryDescription}</TableCell>
              {/* <TableCell>{category.products.length || 0}</TableCell> */}

              <TableCell>{category.products ? 1 : 0}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button
                    className="text-green-500 hover:text-green-700 text-2xl"
                    aria-label="View"
                  >
                    <BiShow />
                  </button>
                  <button
                    onClick={() => onEditClick(category)}
                    className="text-blue-500 hover:text-blue-700 text-2xl"
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDeleteClick(category.CategoryId)}
                    className="text-red-500 hover:text-red-700 text-2xl"
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

export default CategoryTable;
