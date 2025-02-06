"use client";
import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table1";
import { getAllproducts } from "@/action/product";
import Image from "next/image";
const FeatProdTable = () => {
  const [products, setProducts] = useState<any[]>([]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium">Featured product</h1>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Product</TableHead>

            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rate</TableHead>
            {/* <TableHead>Status</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <div className="relative h-12 w-12">
                  <Image
                    src={product.imageUrl[0]}
                    alt={product.name}
                    className="object-cover rounded-sm"
                    fill
                  />
                </div>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.salePrice}</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
              <TableCell>{product.rating}</TableCell>
              {/* <TableCell>
                                    {product.Order && product.Order.orderStatus}
                                  </TableCell>           */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeatProdTable;
