"use client"
import React ,{useState,useEffect} from "react";
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
import { Input } from "@/components/ui/input1"
import { LuListFilter } from "react-icons/lu";
import {  BiShow } from 'react-icons/bi';
import { getAllInventory } from "@/action/inventory";
import { FaEdit, FaTrash,FaPlus,FaFilter } from "react-icons/fa"; 
interface Product {
    pd_id: number; 
    productId: string; 
    name: string; 
    quantity:number;
    unit: string; 
    unitPrice: number; 
    category:string,
    description?: string;
  }
interface Inventory{
  id:string;
  stockStatus: string
  address?:string;
  stockUpdateDate :Date;
  quantityAvailable:number;
  thresholdValue:number;
  product:string[]
}
  


  
const InventProdTable = () => {
 const[inventorys,setInventorys]=useState<any[]>([])
   const[searchQuery,setSearchQuery]=useState("")
 
 useEffect(()=>{
      async function fetchInventory(){
        try{
          const response=await getAllInventory()
          if (response.success && response.data) {
            setInventorys(response.data);
  
          } else {
            console.error("Failed to fetch inventory");
          }
        }
        catch(error){
          console.error("failed to fetch data")
        }
      }
      fetchInventory()
    },[])
    const filteredInventory = inventorys.filter(item =>
      item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return (
    <div className="p-2 ">
        <div className="flex justify-between items-center h-[55px] dark:bg-black/40 px-4 bg-white my-2 mb-3 rounded">
        <div className="flex items-center  py-4 w-1/3 gap-2">
            <Input type="text" placeholder="search by product name ,address" 
                                value={searchQuery}
                                onChange={(e)=>setSearchQuery(e.target.value)}
            />
        <button type="button" className="flex items-center justify-center  p-2 rounded hover:bg-gray-300">
          <LuListFilter className="w-5 h-5" />
        </button>
      </div>   
      
      <Link href="/dashboard/inventory/add">
      <button className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700">
        <FaPlus className="w-4 h-4" /> 
        Add
      </button>
      </Link> 
     
       </div>

    
    <Table className="w-full border-collapse border dark:bg-black/40 shadow rounded  bg-white" >
        {/* <TableCaption>A list of your products in inventory.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Threshhold</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Address</TableHead>
            
             <TableHead>Actions</TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((inventory,index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell className="text-blue-500">{inventory.product && inventory.product.name}</TableCell>
              <TableCell>{inventory.quantityAvailable}</TableCell>
              <TableCell>{inventory.thresholdValue}</TableCell>
              <TableCell>{inventory.stockStatus}</TableCell>
              <TableCell>{inventory.address}</TableCell>

               <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/dashboard/inventory/update/${inventory.id}`}>
                  <button 
                    className=" rounded-md shadow p-2 text-white bg-green-500 hover:bg-green-600 "
                    aria-label="Edit"
                  >
                    Update Stock
                  </button>
                  </Link>
                
                
                
                </div>
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>

    
    </div>
  );
};

export default InventProdTable;
