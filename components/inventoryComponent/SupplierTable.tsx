"use client"
import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";
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
import { AiOutlineTable, AiOutlineAppstore } from "react-icons/ai"; 

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

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "N/A";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const SupplierTable = ({
  onAddClick,
  onEditClick,
  updatedValue,
}: SupplierTableProps) => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("table"); // State to track view mode

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
        console.error("Failed to fetch suppliers");
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
              <TableHead>Supplier Name</TableHead>
              <TableHead>Supplier Contact</TableHead>
              <TableHead>Supplier Email</TableHead>
              <TableHead>Supplier Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-blue-500">
                  {supplier.supplierName}
                </TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{truncateText(supplier.address, 20)}</TableCell>
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
      )}

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 mb-2">
              <div className=" mb-2 flex items-start gap-3">
          <User className="w-5 h-5 text-gray-500 mt-0.5 dark:text-slate-200" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-300">Name</p>
            <p className="text-gray-900 font-medium dark:text-slate-100">{supplier.supplierName}</p>
          </div>
        </div>
        <div className=" mb-2 flex items-start gap-3">
          <Mail className="w-5 h-5 text-gray-500 mt-0.5 dark:text-slate-200" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-300">Email</p>
            <p className="text-gray-900 dark:text-slate-100">{supplier.email}</p>
          </div>
        </div>
        <div className=" mb-2 flex items-start gap-3">
          <Phone className="w-5 h-5 text-gray-500 dark:text-slate-200 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-300 ">Contact</p>
            <p className="text-gray-900 dark:text-slate-50">{supplier.phone}</p>
          </div>
        </div>
        <div className="flex mb-2 items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-500 mt-0.5 dark:text-slate-200" />
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-300">Address</p>
            <p className="text-gray-900 dark:text-slate-100">{supplier.address}</p>
          </div>
        </div>
               
                {/* <div className="flex justify-around mt-4">
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
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierTable;
