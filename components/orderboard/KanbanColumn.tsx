import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { OrderCard } from "./OrderCard";
interface pageProps{
    id:string,
    title:string,
    icon:any,
    orders:any[]
}
export function KanbanColumn({
  id,
  title,
  icon,
  orders
}:pageProps) {
  return <div className="bg-white  dark:bg-[#162846] rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="font-semibold">{title}</h2>
        <span className="ml-auto bg-gray-100  dark:bg-gray-700 px-2 py-1 rounded text-sm">
          {orders.length}
        </span>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-[200px] transition-colors ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}>
            {orders.map((order, index) => <OrderCard key={order.id} order={order} index={index} />)}
            {provided.placeholder}
          </div>}
      </Droppable>
    </div>;
}