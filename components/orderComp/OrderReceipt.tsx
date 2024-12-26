import { Check, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface OrderDetails {
  orderId: string
  orderer: string
  productId: string
  productName: string
  orderDate: string
  unit: string
  unitPrice: number
  quantity:number
  totalPrice: number
  orderStatus: string
}

export default function ReceiptCard() {
  const orderDetails: OrderDetails = {
    orderId: "000085752257",
    orderer: "Hari Bahadur",
    productId: "000085752257",
    productName: "Mobile Phone",
    orderDate: "2024-12-12",
    unit: "pcs",
    unitPrice: 20000,
    quantity:5,
    totalPrice: 100000,
    orderStatus: "Success",
  }

  return (
    <Card className="w-full max-w-md md:max-w-5xl mx-auto p-6 mt-6 mb-6 shadow-lg rounded-xl hover:scale-105 transform ease-in-out duration-300">
      <CardContent className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl text-gray-600 font-medium">Thank you for your purchase</h2>
          <p className="text-2xl md:text-3xl font-bold">Rs 1,000,000</p>
        </div>

        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2  md:gap-x-16 md:px-3">
          {[
            { label: "Order Id", value: orderDetails.orderId },
            { label: "Order By", value: orderDetails.orderer },
            { label: "Product Id", value: orderDetails.productId },
            { label: "Product Name", value: orderDetails.productName },
            { label: "Order Date", value: orderDetails.orderDate },
            { label: "Unit", value: orderDetails.unit },
            { label: "Unit Price", value: `Rs ${orderDetails.unitPrice}` },
            { label: "Quantity", value: orderDetails.quantity },
            { label: "Total Price", value: `Rs ${orderDetails.totalPrice}` },
            { label: "Order Status", value: orderDetails.orderStatus },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-gray-500 ">{item.label}</span>
              <span className="text-gray-950 ">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-6">
        <Button className="w-full flex items-center justify-center gap-2  transition duration-300 ease-in-out hover:bg-[#5b58a8] hover:text-white" variant="outline" >
          <Download className="h-5 w-5" />
          Get PDF Receipt
        </Button>
      </CardFooter>
    </Card>
  )
}
