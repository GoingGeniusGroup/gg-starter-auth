import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { format } from "date-fns";
interface orderProp{
    index:number,
    order:any
}
export function OrderCard({
  order,
  index
}:orderProp) {
  return <Draggable draggableId={order.id} index={index}>
      {(provided, snapshot) => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`bg-white border rounded-lg p-3 mb-3 ${snapshot.isDragging ? "shadow-lg" : "shadow-sm"}`}>
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium">{order.orderNumber}</span>
            <span className="text-sm text-gray-500">
              {format(new Date(order.date), "MMM d, yyyy")}
            </span>
          </div>
          <div className="text-sm mb-2">{order.customer}</div>
          <div className="text-sm text-gray-600 mb-2">
            {order.products.join(", ")}
          </div>
          <div className="text-right text-green-500 font-medium">
            ${order.total.toFixed(2)}
          </div>
        </div>}
    </Draggable>;
}