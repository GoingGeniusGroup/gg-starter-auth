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

interface Supplier {
  id: string;
  supplierName: string;
  email: string;
  phone: string;
  address:string;
  Product: string[];
}
interface SupplierTableProps {
  suppliers:Supplier[];
  onAddClick: () => void;
}
const SupplierTable = ({ onAddClick ,suppliers}:SupplierTableProps) => {
 

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
        {/* <TableCaption>A list of your Suppliers.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Supplier Id</TableHead>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Supplier Contact</TableHead>
            <TableHead>Supplier Email</TableHead>
            <TableHead>Supplier Address</TableHead>
            {/* <TableHead>Products</TableHead>
            <TableHead>Last Supplied</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{supplier.id}</TableCell>
              <TableCell className="text-blue-500">{supplier.supplierName}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.address}</TableCell>
              
              {/* <TableCell className="text-green-600">{supplier.product}</TableCell>
              <TableCell>{supplier.lastSupplied.toLocaleDateString()}</TableCell> */}
              
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

export default SupplierTable;
