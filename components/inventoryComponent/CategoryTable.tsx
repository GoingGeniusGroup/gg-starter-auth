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
import { Input } from "@/components/ui/input";
import { LuListFilter } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface Category {
  CategoryId: number;
  type: string;
  productQuantity: number;

}
interface CategoryTableProps {
  onAddClick: () => void;
}
const CategoryTable = ({ onAddClick }:CategoryTableProps) => {
  const categories: Category[] = [
    {
      CategoryId: 1,
      type: "Virtual",
      productQuantity:20, 
    },

    {
        CategoryId: 2,
        type: "Physical",
        productQuantity:20, 
      },
  
 
  ];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center h-[55px] px-4 bg-white my-2 mb-3 rounded">
        <div className="flex items-center py-4 w-1/4 gap-2">
          <Input type="text" placeholder="Search" />
          <button
            type="button"
            className="flex items-center justify-center p-2 rounded hover:bg-gray-300"
          >
            <LuListFilter className="w-5 h-5" />
          </button>
        </div>

        <button
        onClick={onAddClick} className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700">
          <FaPlus className="w-4 h-4" />
          Add
        </button>
        
      </div>

      <Table className="w-full border-collapse border shadow rounded bg-white">
        {/* <TableCaption>A list of Category Type.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Category Id</TableHead>
            <TableHead>Category Type</TableHead>
            <TableHead>Number of Product</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.CategoryId}</TableCell>
              <TableCell className="text-blue-500">{category.type}</TableCell>
              <TableCell>{category.productQuantity}</TableCell>
              
              <TableCell>
                <div className="flex space-x-2">
                  <button
                    className="text-green-500 hover:text-green-700 text-2xl"
                    aria-label="View"
                  >
                    <BiShow />
                  </button>
                  <button
                  onClick={onAddClick}
                    className="text-blue-500 hover:text-blue-700 text-2xl"
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
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
