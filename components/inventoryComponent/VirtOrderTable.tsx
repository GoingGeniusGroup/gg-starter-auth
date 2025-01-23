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
import Link from "next/link";
import { Input } from "@/components/ui/input1";
import { LuListFilter } from "react-icons/lu";
import { BiShow } from "react-icons/bi";
import { FaEdit, FaTrash, FaPlus, FaFilter } from "react-icons/fa";
import { getvirtualProdOrder } from "@/action/virtProdOrder";

const VirtOrderTable = () => {
  const [vorders, setVorders] = useState<any[]>([]);
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await getvirtualProdOrder();
        if (response.success && response.data) {
          // console.log(response.data)
          setVorders(response.data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("failed to fetch data");
      }
    }
    fetchOrder();
  }, []);
  return (
    <div>
      <div className="p-2 ">
        <div className="flex justify-between items-center h-[55px] px-4 my-2 mb-3 rounded">
          <div className="flex items-center py-4 w-1/4 gap-2">
            <Input type="text" placeholder="search" />
            <button
              type="button"
              className="flex items-center justify-center  p-2 rounded hover:bg-gray-300"
            >
              <LuListFilter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <Table className="w-full border-collapse border  shadow rounded">
          <TableHeader>
            <TableRow>
              <TableHead>S.N</TableHead>
              {/* <TableHead>Product</TableHead> */}
              <TableHead>OrderBy</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Status</TableHead> */}

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vorders.map((vorder, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                {/* <TableCell className="text-blue-500">
                  {vorder.VirtualProduct && vorder.VirtualProduct.name}
                </TableCell> */}
                <TableCell>{vorder.Order?.user?.userName || "N/A"}</TableCell>
                <TableCell>
                  {" "}
                  {vorder.Order?.orderDate
                    ? new Date(vorder.Order.orderDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                <TableCell>
                  {vorder.Order && vorder.Order.orderQuantity}
                </TableCell>
               
                <TableCell>
                  {vorder.Order && vorder.Order.orderAmount}
                </TableCell>
                <TableCell>
                  {vorder.Order && vorder.Order.orderStatus}
                </TableCell>
                <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/dashboard/virtualOrder/${vorder.Order && vorder.Order.id}`}>
                  <button 
                    className=" rounded-md shadow p-2 text-white bg-green-500 hover:bg-green-600 "
                    aria-label="Edit"
                  >
                    View Details
                  </button>
                  </Link>
                
                
                
                </div>
              </TableCell> 

                {/* <TableCell>
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
              </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VirtOrderTable;
