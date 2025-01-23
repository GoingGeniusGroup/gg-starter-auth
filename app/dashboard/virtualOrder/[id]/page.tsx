"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import { getOrderDetail } from '@/action/userOrder';
import Link from 'next/link';
interface OrderProps{
  params:{
      id:string
  }
}
const OrderDetail:React.FC<OrderProps> = ({params}) => {
  const { id } = params;
   const[order,setOrder]=useState<any>([])
  useEffect(()=>{
      async function fetchData(){
        try{
          
            const response=await getOrderDetail(id)
            if (response.success && response.data) {
                    console.log('helloiii')
              console.log(response.data)
  
              setOrder(response.data[0]);
              
            } else {
              console.error("Failed to fetch order data");
            }
          
        }
        catch (error) {
          console.error("Failed to fetch data", error);
        }
  
      }
      fetchData();
    },[id])
  return (
    <>
          <div>

<div className="w-full min-h-screen ">
      <div className="sticky top-0 z-60  border-b border-gray-200 p-4 shadow-sm">
      
      </div>
      <div className="p-8" >
        <div className="max-w-3xl mx-auto">
        
          <div className="border-b border-gray-300 mb-6"></div>
          <div className=" mb-8">
            <h2 className="text-xl text-center font-medium mb-2">Order Details</h2>
            <div className="text-sm">
              <p>Order ID: {id}</p>
              <p>Date: {new Date(order?.orderDate).toLocaleDateString()}</p>
              <p>Status: {order?.orderStatus}</p>
            </div>
            
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium mb-2 border-b border-gray-300">
              CUSTOMER INFORMATION
            </h2>
            <p className="text-sm">Name: {order?.user?.userName}</p>
            <p className="text-sm">Email: {order?.user?.email}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium mb-2 border-b border-gray-300">
              DELIVERY ADDRESS
            </h2>
            <p className="text-sm">{order.streetAddress},{order.city},{order.state}</p>
            
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium mb-2 border-b border-gray-300">
              ORDER ITEMS
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Unit Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.product?.map((item:any, index:number) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="text-right py-2">{order.orderQuantity}</td>
                    <td className="text-right py-2">
                    ${item.sellPrice.toFixed(2)}

                    </td>
                    <td className="text-right py-2">
                    ${(order.orderQuantity * item.sellPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
                              {order?.VirtualProductOnOrder?.map((virtualProductOnOrder: any, index: number) => {
  const product = virtualProductOnOrder.VirtualProduct;
  return (
    <tr key={index} className='border-b' >
      <td className="py-2">{product.name}</td>
      <td className="text-right py-2">{virtualProductOnOrder.quantity}</td>
      <td className="text-right py-2">${product.price.toFixed(2)}</td>
      <td className="text-right py-2">${(virtualProductOnOrder.quantity* product.price).toFixed(2)}</td>
    </tr>
  );
})}
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-medium mb-2 border-b border-gray-300">
              PAYMENT SUMMARY
            </h2>
            <div className="flex justify-between text-sm font-medium  border-gray-300 pt-1">
              <span>Total Amount:</span>
              <span>${order.orderAmount}</span>
            </div>
          </div>
          <div className="text-sm">
            <p>Payment Method: {order.paymentType || "card"}</p>
            <p>Payment Status: {order.paymentStatus ? "paid":"unpaid"}
            </p>
          </div>
      <div>
        <Link href={'/dashboard/virtualOrder'} >
        <button className='bg-green-500 rounded-lg px-5 py-2 my-2 text-white'> Back</button>
        </Link>
      </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default OrderDetail