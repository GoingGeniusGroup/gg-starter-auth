import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { format } from "date-fns";
import Image from "next/image";
interface orderProp{
    index:number,
    order:any
}
import { User, Package, } from "lucide-react";

export function OrderCard({
  order,
  index
}:orderProp) {
  return <Draggable draggableId={order.id} index={index}>
      {(provided, snapshot) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`bg-white border rounded-lg p-3 mb-3 ${snapshot.isDragging ? "shadow-lg" : "shadow-sm"}`}>
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium text-gray-950">{order.orderNumber}</span>
            <span className="text-sm text-gray-500">
              {format(new Date(order.date), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center text-sm mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-4 h-4 text-blue-600 mr-2"
              fill="currentColor"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
            <span className="text-black">{order.customer}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Package size={18} className="text-orange-600 mr-2" />
            <span>{order.products.join(", ")}</span>
          </div>
          <div className="text-right text-green-500 font-medium">
            ${order.total.toFixed(2)}
          </div>
        </div>}
    </Draggable>;
}