"use client"
import React from 'react'
import { useState, useEffect,useRef } from "react";
import html2canvas from "html2canvas";
import { getOrderDetail } from '@/action/userOrder';
import jsPDF from "jspdf";
import { FileDown, Image, FileText, Loader2 } from "lucide-react";
interface OrderProps{
    params:{
        id:string
    }
}
const OrderReceipt: React.FC<OrderProps> = ({params}) => {
    const { id } = params;
    const invoiceRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

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
 
  const downloadAsPDF = async () => {
    if (!invoiceRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(invoiceRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`invoice-${id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setIsDownloading(false);
  };
  return (
    <div>

<div className="w-full min-h-screen ">
      <div className="sticky top-0 z-60  border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-2">
        
          <button
            onClick={downloadAsPDF}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 bg-gray-100 dark:text-black hover:bg-gray-200 rounded text-sm font-medium disabled:opacity-50"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            Download PDF
          </button>
        </div>
      </div>
      <div className="p-8" ref={invoiceRef}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-medium text-gray-800 dark:text-slate-100">Aryal SuperMarket</h1>
            <h1 className="text-lg font-medium text-gray-500 dark:text-slate-200">Satdobato,Lalitpur</h1>

          </div>
          <div className="border-b border-gray-300 mb-6"></div>
          <div className=" mb-8">
            <h2 className="text-xl text-center font-medium mb-2">Order Receipt</h2>
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
          <div className="mt-12 pt-6 border-t border-gray-300">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">
                Thank You for Your Purchase!
              </p>
              <p className="text-sm text-gray-600 dark:text-slate-200">
                If you have any questions, feel free to contact us at:{" "}
                <span className="font-medium">980000000</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default OrderReceipt 