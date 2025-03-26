"use client"
import React, { useState,useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { KanbanColumn } from "./KanbanColumn";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { DropResult } from "@hello-pangea/dnd";
import { OrderInfoBoard } from "@/action/order";
import { updateOrderStatus } from "@/action/order";
// Define the type for an order
// interface Order {
//   id: string;
//   orderNumber: string;
//   customer: string;
//   products: string[];
//   total: number;
//   date: string;
// }



// Define columns with proper typing
interface ColumnProps{
id:string; title:string; icon:any;

}
const columns = [{
    id: "pending",
    title: "Pending",
    icon: Package
  }, {
    id: "shipped",
    title: "Shipped",
    icon: Truck
  }, {
    id: "delivered",
    title: "Delivered",
    icon: CheckCircle
  }, {
    id: "cancelled",
    title: "Cancelled",
    icon: XCircle
  }];

export function OrderMngt() {

  const [orders,setOrders]=useState<any>({
    pending:[],
    shipped:[],
    delivered:[],
    cancelled:[]
    });
  
  useEffect(()=>{
    const fetchData = async () => {
      try {
      const response =  await OrderInfoBoard()
      setOrders(response.data);
      } catch (error) {
      console.error(error);
      }
      };
      fetchData()
  },[])

const onDragEnd = async(result: DropResult) => {
    const {
      source,
      destination
    } = result;
    if (!destination) return;


    if (source.droppableId === destination.droppableId) {
      //handel reordering within same column,
      const items = Array.from(orders[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setOrders({
        ...orders,
        [source.droppableId]: items
      });


    } else {
      //betn diff col
      const sourceItems = Array.from(orders[source.droppableId]);
      const destItems = Array.from(orders[destination.droppableId]);
      const [movedItem]:any = sourceItems.splice(source.index, 1);
      movedItem.status = destination.droppableId;

      destItems.splice(destination.index, 0, movedItem);
      setOrders({
        ...orders,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
        // Update the order status
        const response = await updateOrderStatus(movedItem.id, destination.droppableId);
        if (!response.success) {
          console.error("Failed to update order status in DB:", response.message);
        }
    }
  };

return  <main className="min-h-screen w-full  p-4">
<div className="max-w-[1600px] mx-auto">
  <h1 className="text-2xl font-bold mb-6">Order Management</h1>
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map(({
      id,
      title,
      icon: Icon
    }) => <KanbanColumn key={id} id={id} title={title} icon={<Icon className="w-5 h-5" />} orders={orders[id]} />)}
    </div>
  </DragDropContext>
</div>
</main>;

}
