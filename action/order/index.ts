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

export async function OrderInfoBoard(){
  try{
    const orders = await db.order.findMany({
      include: {
        user: true,
        VirtualProductOnOrder: {
          include: {
            VirtualProduct: true,
          },
        },
        ProductOnOrder: true,
      },
    });
    

  
    const formattedOrders = orders.map((order,index) => ({
      id: order.id,
      orderNumber: `#ORD${String(index + 1).padStart(4, '0')}`, 
      status:order.orderStatus,
      customer: order.user.userName || '', 
      products:
        order.VirtualProductOnOrder.length > 0
          ? order.VirtualProductOnOrder.map((item) => item.VirtualProduct.name)
          : ['No Products'],
      total:order.orderAmount,
        // order.orderAmount ||
        // (order.ProductOnOrder.reduce(
        //   (acc, curr) => acc + curr.price * curr.quantity,
        //   0
        // ) || 0),
      date:
        new Date(order.orderDate).toISOString().split('T')[0] ||
        new Date().toISOString().split('T')[0],
    }));
// group by status
  const groupedOrders = {
    pending:
      formattedOrders.filter((o) => o.status === 'PENDING') || [],
    shipped:
      formattedOrders.filter((o) => o.status === 'SHIPPED') || [],
    delivered:
      formattedOrders.filter((o) => o.status === 'DELIVERED') || [],
    cancelled:
      formattedOrders.filter((o) => o.status === 'CANCELLED') || [],
  };
return{success:true,data:groupedOrders}
  }
  catch(error){
    console.error("Error fetching the order datas")
    return{success:false,message:"An unexpected error occured"}
  }
}

export async function orderInformation() {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const orders = await db.order.findMany({
      where: {
        deliveryDate: {
          not: null,
          gte: sixMonthsAgo, // Fetch orders from last 6 months
        },
      },
      select: {
        deliveryDate: true,
        orderAmount: true,
        orderQuantity: true,
      },
      orderBy: {
        deliveryDate: "asc",
      },
    });

  

    if (!orders || orders.length === 0) {
      return { success: false, message: "No order data found" };
    }

    const monthlyData = orders.reduce((acc, order) => {
      if (!order.deliveryDate) return acc;

      const date = new Date(order.deliveryDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!acc[key]) {
        acc[key] = {
          month: key,
          totalOrderAmount: 0,
          totalOrderQuantity: 0,
        };
      }

      acc[key].totalOrderAmount += order.orderAmount || 0;
      acc[key].totalOrderQuantity += order.orderQuantity || 0;

      return acc;
    }, {} as Record<string, { month: string; totalOrderAmount: number; totalOrderQuantity: number }>);

    return { success: true, data: Object.values(monthlyData) };
  } catch (error) {
    console.error("Error fetching the order data", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
