"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table1"
import { getvirtualProdOrder } from "@/action/virtProdOrder";

export default function OrderStatTable() {
     const [vorders, setVorders] = useState<any[]>([]);
      useEffect(() => {
        async function fetchOrder() {
          try {
            const response = await getvirtualProdOrder();
            if (response.success && response.data) {
              
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
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium"> Recent Orders</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
             <TableHead>S.N</TableHead>
           {/* <TableHead>Product</TableHead> */}
                          <TableHead>OrderBy</TableHead>
                          <TableHead>Order Date</TableHead>
                          <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vorders.map((vorder,index) => (
            <TableRow key={vorder.id}>
              {/* <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12">
                    <Image
                      src={order.productImage || "/placeholder.svg"}
                      alt={order.productName}
                      className="object-cover rounded-sm"
                      fill
                    />
                  </div>
                  <span className="font-medium">{order.productName}</span>
                </div>
              </TableCell> */}
              <TableCell>{index + 1}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

