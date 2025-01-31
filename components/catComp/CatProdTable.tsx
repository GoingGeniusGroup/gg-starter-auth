import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table1";
  interface categoryProps{
    products:any[]
  }
  import { BiShow } from "react-icons/bi";
  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
const CatProdTable = ({products}:categoryProps) => {
  return (
    <div>
        <Table className="w-full border-collapse border dark:bg-black shadow rounded bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>S.N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Cost Price</TableHead>
              <TableHead>Sell Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-blue-500">{product.name}</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>{product.costPrice}</TableCell>
                <TableCell>{product.salePrice}</TableCell>
                <TableCell>{truncateText(product.description ?? "", 20)}</TableCell>
                <TableCell>{product.isFeatured ? "Yes" : "No"}</TableCell>

                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      className="text-green-500 hover:text-green-700 text-xl"
                      aria-label="view"
                    >
                      <BiShow />
                    </button>
                  

                    
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    </div>
  )
}

export default CatProdTable