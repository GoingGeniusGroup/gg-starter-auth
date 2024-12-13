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
  supplierId: number;
  name: string;
  email: string;
  phone: string;
  product: string;
  lastSupplied: Date;
}
interface SupplierTableProps {
  onAddClick: () => void;
}
const SupplierTable = ({ onAddClick }:SupplierTableProps) => {
  const suppliers: Supplier[] = [
    {
      supplierId: 1,
      name: "Milan Magar",
      email: "contact@abc.com",
      phone: "9800000000",
      product: "LED Bulb",
      lastSupplied: new Date("2024-08-15"),
    },
    {
      supplierId: 2,
      name: "Global Foods",
      email: "sales@globalfoods.com",
      phone: "9876543210",
      product: "Preeti Instant Noodle",
      lastSupplied: new Date("2024-09-01"),
    },
    {
      supplierId: 3,
      name: "Pashupati Prasad",
      email: "pashu@gmail.com",
      phone: "6667778888",
      product: "Good Knight",
      
      lastSupplied: new Date("2024-09-05"),
    },
    {
      supplierId: 4,
      name: "SteelWorks Ltd.",
      email: "info@steelworksltd.com",
      phone: "555-111-2222",
      product: "Steel",
      
      lastSupplied: new Date("2024-09-10"),
    },
    {
      supplierId: 5,
      name: "Textile World",
      email: "support@textileworld.com",
      phone: "444-222-3333",
      product: "Classic T-shirt",
      
      lastSupplied: new Date("2024-08-28"),
    },
    {
      supplierId: 6,
      name: "Fresh Produce Co.",
      email: "fresh@produceco.com",
      phone: "666-777-8888",
      product: "Potatoes",
      lastSupplied: new Date("2024-09-05"),
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
        <TableCaption>A list of your Suppliers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Supplier Id</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Supplier Contact</TableHead>
            <TableHead>Supplier Email</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Last Supplied</TableHead>
           
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{supplier.supplierId}</TableCell>
              <TableCell className="text-blue-500">{supplier.name}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell className="text-green-600">{supplier.product}</TableCell>
              <TableCell>{supplier.lastSupplied.toLocaleDateString()}</TableCell>
              
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
