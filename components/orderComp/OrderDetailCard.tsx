"use client"
import React ,{useState,useEffect} from 'react'
import { Package, MapPin, Calendar, CreditCard } from "lucide-react";
import { getUserOrderDetail } from '@/action/userOrder';
import Link from 'next/link';                  
interface Product {
  name: string;
  quantity: number;
  
}

interface Order {
  orderStatus: string;
  orderDate: string;
  deliveryDate: string;
  streetAddress: string;
  city: string;
  state: string;
  products: Product[];
}
interface OrderProps{
  user:any
}
const OrderDetailCard = ({user}:OrderProps) => {
  console.log("hello")
  console.log(user)
  const[orders,setOrders]=useState<any[]>([])
  useEffect(()=>{
    async function fetchData(){
      try{
        if (user) {
          const response=await getUserOrderDetail(user.id)
          if (response.success && response.data) {
            console.log('hhhhhhhhhh')
            console.log(response.data); // Log the data to inspect it

            setOrders(response.data);
          } else {
            console.error("Failed to fetch order data");
          }
        } else {
          console.error("User is undefined");
        }
      }
      catch (error) {
        console.error("Failed to fetch data", error);
      }

    }
    fetchData();
  },[user])
  type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'true' | 'false';

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      true: "bg-green-100 text-green-800",
      false: "bg-red-100 text-red-800",
    };
    return colors[status];
  };
  return (
    <div>
     {orders.map((order,index)=>(
        <div key={index} className="w-full max-w-3xl my-4 bg-white dark:bg-black rounded-lg shadow p-6 space-y-6">
        {/* Order Header */}
        <div className="flex flex-wrap gap-4 justify-between items-start border-b pb-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-slate-200">Order by</div>
            <div className="font-medium">{user?.username}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-slate-200">Order Status</div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium `}
            >
              {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
            </span>
          </div>
        </div>
        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400 dark:text-slate-200" />
            <div>
              <div className="text-sm text-gray-500 dark:text-slate-200">Order Date</div>
              <div className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</div>

            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400 dark:text-slate-200" />
            <div>
              <div className="text-sm text-gray-500 dark:text-slate-200">Delivery Date</div>
              <div className="font-medium">{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500 dark:text-slate-200">Payment Status</div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium`}
              >
                {order.paymentStatus ? "paid":"unpaid"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400 dark:text-slate-200" />
            <div>
              <div className="text-sm text-gray-500">Delivery Address</div>
              <div className="font-medium">
                {order.streetAddress}, {order.city}, {order.state}
              </div>
            </div>
          </div>
        </div>
        {/* Products List */}
        <div className="space-y-4">
          <div className="font-medium flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-400" />
            Order Items
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-black">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-black divide-y divide-gray-200">
                   { order && order.product.map((product:any, index:number) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm">{product.name}</td>
                    <td className="px-4 py-3 text-sm">{order.orderQuantity}</td>

                    <td className="px-4 py-3 text-sm">
                      ${product.sellPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      ${(order.orderQuantity * product.sellPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
               {order.VirtualProductOnOrder?.map((virtualProductOnOrder: any, index: number) => {
  const product = virtualProductOnOrder.VirtualProduct;
  return (
    <tr key={index}>
      <td className="px-4 py-3 text-sm">{product.name}</td>
      <td className="px-4 py-3 text-sm">{order.orderQuantity}</td>
      <td className="px-4 py-3 text-sm">${product.price.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm">${(order.orderQuantity * product.price).toFixed(2)}</td>
    </tr>
  );
})}

              </tbody>
            </table>
          </div>
        </div>
        {/* Total Amount */}
        {/* <div className="border-t pt-4 flex justify-end">
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Amount</div>
            <div className="text-xl font-semibold">${order.orderAmount.toFixed(2)}</div>
          </div>
        </div> */}
        <div className="border-t pt-4 flex justify-between">
  <div className="text-left">
    <div className="text-sm text-gray-500">Total Amount</div>
    <div className="text-xl font-semibold">${order.orderAmount.toFixed(2)}</div>
  </div>
  <Link  href={`/dashboard/userAccount/orders/${order.id}`}
  >
    <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md">
    View Receipt
  </button>
  </Link>
 
</div>

      </div>
     ))}
    </div>
  )
}

export default OrderDetailCard