"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { toast } from "sonner";
  import Link from "next/link";

import { Label } from "@/components/ui/label"
import { getInventoryDetail, updateInventoryQuantity } from "@/action/inventory";
import { Input } from "@/components/ui/input1";
import { FaPlus, FaMinus } from "react-icons/fa";
interface UpdateProps {
    params: {
      id: string;
    };
  }
const UpdateInventoryPage: React.FC<UpdateProps> = ({params}) => {
   const router = useRouter();
    const { id } = params;

  const [inventory, setInventory] = useState<any>({});
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await getInventoryDetail(id);
        if (response.success && response.data) {
          setInventory(response.data);
        } else {
          console.error("Failed to fetch inventory");
        }
      } catch (error) {
        console.error("Failed to fetch data");
      }
    }
    fetchInventory();
  }, [id]);

  const handleRestock = async () => {
    try {
      await updateInventoryQuantity(id, quantity);
      const updatedInventory = await getInventoryDetail(id);
      if (updatedInventory.success && updatedInventory.data) {
        setInventory(updatedInventory.data);
            toast.success("Product has been restock ");
        
        setQuantity(0)

      }
    } catch (error) {
      console.error("Error restocking inventory:", error);
                toast.error("Failed to restock");
      
    }
  };

  const handleReduce = async () => {
    try {
      if (inventory.quantityAvailable < quantity) {
        alert("Not enough stock available");
        return;
      }
      await updateInventoryQuantity(id, -quantity);
      const updatedInventory = await getInventoryDetail(id);
      if (updatedInventory.success && updatedInventory.data) {
        setInventory(updatedInventory.data);
        toast.success("Product stock has been reduced ");

        setQuantity(0)

      }
    } catch (error) {
      console.error("Error reducing inventory:", error);
      toast.error("Failed to update");

    }
  };

  return (

<div className=" flex justify-center p-4">
<Card className="w-full max-w-md  rounded-lg shadow-md">
  <CardHeader>
    <CardTitle className="text-center text-xl font-semibold">Update Inventory</CardTitle>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name" className="">Product</Label>
          <Input
            id="name"
            readOnly
            value={inventory.product?.name || ""}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status" className="">Inventory Status</Label>
          <Input
            id="status"
            readOnly
            value={inventory.stockStatus}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="stocks" className="">Available Stock</Label>
          <Input
            id="stocks"
            readOnly
            value={inventory.quantityAvailable}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="address" className="">Inventory Address</Label>
          <Input
          id="address"
            readOnly
            value={inventory.address}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter>Quantity To Update:</CardFooter>
  <CardFooter>
    
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={handleRestock}
        >
          <FaPlus className="w-4 h-4" /> Restock
        </button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={handleReduce}
        >
          <FaMinus className="w-4 h-4" /> Reduce
        </button>
      </div>
    </div>
  </CardFooter>
  <div className="px-4 py-2">
  <Link href="/dashboard/inventory">
        <button className="w-full  text-white px-4 py-2 rounded-md shadow bg-blue-500 hover:bg-blue-600">
            Back
        </button>
    </Link>
  </div>
  

</Card>
</div>
  );
};

export default UpdateInventoryPage;
