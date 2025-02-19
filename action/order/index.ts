"use server"
import { db } from "@/lib/db";

export async function orderInfo(){
    try{
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const orders=await db.order.groupBy(
            {
                by: ['deliveryDate'],
                _sum: {
                    orderAmount: true,
                    orderQuantity: true,
                  },
                  where: {
                    deliveryDate: {
                      not: null,
                      gte: sixMonthsAgo, //  fetch last 6 months
                    },
                  },
                  orderBy: {
                    deliveryDate: 'asc',
                  },
            }
        )

        const monthlyData = orders.reduce((acc, order) => {
            if (!order.deliveryDate) return acc;
      
            const date = new Date(order.deliveryDate);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
            if (!acc[key]) {
              acc[key] = {
                month: key,
                totalOrderAmount: 0,
                totalOrderQuantity: 0,
              };
            }
      
            acc[key].totalOrderAmount += order._sum.orderAmount || 0;
            acc[key].totalOrderQuantity += order._sum.orderQuantity || 0;
            
            return acc;
          }, {} as Record<string, { month: string; totalOrderAmount: number; totalOrderQuantity: number }>);
      return {success:true,data:monthlyData} 
    }
    catch(error){
        console.error("Error fetching the order datas")
        return{success:false,message:"An unexpected error occured"}
    }
}