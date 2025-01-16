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
import { Input } from "@/components/ui/input1";
import { LuListFilter } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { getAllSuppliers } from "@/action/supplier";
import { toast } from "sonner";
import { deleteSupplier } from "@/action/supplier";
import { update } from "@/auth";
interface Supplier {
  id: string;
  supplierName: string;
  email: string;
  phone: string;
  address: string;
  Product: string[];
}
interface SupplierTableProps {
  updatedValue: Supplier[];
  onAddClick: () => void;
  onEditClick: (supplier: any) => void;
}
const SupplierTable = ({
  onAddClick,
  onEditClick,
  updatedValue,
}: SupplierTableProps) => {
  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSuppliers();
        if (response.success && response.data) {
          console.log("Supplier:", response.data);
          setSuppliers(response.data);
        } else {
          console.error("Failed to fetch suppliers");
        }
      } catch (error) {
        console.error("failed to fetch suppliers");
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    setSuppliers(updatedValue);
  }, [updatedValue]);

  const removeSupplier = async (supplierId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?"
    );
    if (confirmed) {
      try {
        const response = await deleteSupplier(supplierId);
        if (response.success) {
          setSuppliers((prev) =>
            prev.filter((supplier) => supplier.id !== supplierId)
          );
          toast.success("Supplier deleted successfully");
        } else {
          console.error("Failed to delete supplier");
          toast.error("Failed to delete supplier");
        }
      } catch (error) {
        console.error("Failed to delete supplier");
        toast.error("Failed to delete supplier");
      }
    }
  };

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

      <Table className="w-full border-collapse border shadow rounded">
        {/* <TableCaption>A list of your Suppliers.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            {/* <TableHead>Supplier Id</TableHead> */}
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
              {/* <TableCell>{supplier.id}</TableCell> */}
              <TableCell className="text-blue-500">
                {supplier.supplierName}
              </TableCell>
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
                    onClick={() => onEditClick(supplier)}
                    className="text-blue-500 hover:text-blue-700 text-2xl"
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => removeSupplier(supplier.id)}
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
