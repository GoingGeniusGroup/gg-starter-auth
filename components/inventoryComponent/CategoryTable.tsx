
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
import { toast } from "sonner";
import { getAllCategories, deleteCategory } from "@/action/category";
import { Input } from "@/components/ui/input1";
import { LuListFilter } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { AiOutlineTable, AiOutlineAppstore } from "react-icons/ai"; // Import icons for table and grid
import Image from "next/image";
interface Category {
  id: number; // Ensure id is a number
  categoryName: string;
  categoryDescription: string;
  products: string;
}

interface CategoryTableProps {
  onAddClick: () => void;
  onEditClick: (category: any) => void;
  updatedValue: Category[];
}

const CategoryTable = ({
  onAddClick,
  onEditClick,
  updatedValue,
}: CategoryTableProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("table"); // State to track view mode

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setCategories(updatedValue);
  }, [updatedValue]);

  const removeCategory = async (categoryId: string): Promise<void> => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmed) return;
    try {
      const response = await deleteCategory(categoryId);
      if (response.success) {
        toast.success("Category deleted successfully");
        setCategories((prev) =>
          prev.filter((category) => category.id !== categoryId)
        );
      } else {
        toast.error("Failed to delete category");
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An unexpected error occurred while deleting the category");
    }
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center dark:bg-black/40 h-[55px] px-4 bg-white my-2 mb-3 rounded">
        <div className="flex items-center py-4 w-1/4 gap-2">
          <Input type="text" placeholder="Search" />
          <button
            type="button"
            className="flex items-center justify-center p-2 rounded hover:bg-gray-300"
          >
            <LuListFilter className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded hover:bg-gray-200 hover:dark:bg-gray-800 ${
              viewMode === "table" ? "bg-gray-200 dark:bg-gray-800" : ""
            }`}
          >
            <AiOutlineTable className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded hover:bg-gray-200 hover:dark:bg-gray-800 ${
              viewMode === "grid" ? "bg-gray-200 dark:bg-gray-800" : ""
            }`}
          >
            <AiOutlineAppstore className="w-5 h-5" />
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

      {viewMode === "table" && (
        <Table className="w-full border-collapse border shadow rounded">
          <TableHeader>
            <TableRow>
              <TableHead>S.N</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Category Type</TableHead>
              <TableHead>Category Description</TableHead>
              <TableHead>Number of Products</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-blue-500">
                  {category.categoryName}
                </TableCell>
                <TableCell>Physical</TableCell>
                <TableCell>{truncateText(category.categoryDescription, 20)}</TableCell>
                <TableCell>{category.products.length}</TableCell>
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
                      onClick={() => removeCategory(category.id)}
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
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >

              {/* <div className="w-full">
                                      <img src={`/upload/${category.categoryImage[0]}`} alt={category.categoryName} className="w-full h-56 object-cover" />

              </div> */}
       
       <div className="w-full h-56 relative"> 
        <Image
          src={category.categoryImage[0]}
          alt={category.categoryName}
          layout="fill"
          objectFit="contain"
          className=" rounded-t-lg" 
        
        />
      </div>
              <div className="p-4 mb-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-slate-50">
                  {category.categoryName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-200 mb-2">
                  {truncateText(category.categoryDescription, 50)}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                    Physical
                  </span>
                  <span className="text-sm text-black bg-green-400 rounded-full px-2.5 py-0.5">
                    Products: {category.products.length}
                  </span>
                </div>
                {/* <div className="flex justify-around mt-4">
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
                    onClick={() => removeCategory(category.id)}
                    className="text-red-500 hover:text-red-700 text-2xl"
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

export default CategoryTable;
