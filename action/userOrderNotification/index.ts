"use server"
import { db } from "@/lib/db";

export  async function getUserOrderMsg(userId:string) {
    try{
        const notification=await db.order.findMany({
            where:{
                userId:userId,
            
                    orderStatus: {
                        in: ["PENDING", "DELIVERED"],
                      },
            },
            select:{
                id:true,
                orderStatus:true,
                orderDate:true,
            },
            orderBy:{
                orderDate:"desc"
            }
        });
        const notifyMsg=notification.map((order)=>({
            id:order.id,
            title: order.orderStatus === "PENDING"
            ? "Order Placed"
            : "Order Delivered",
            message:order.orderStatus==="PENDING"
            ? `Your order #${order.id} has been placed.`
            : `Your order #${order.id} has been delivered.`,
            time: new Date(order.orderDate).toLocaleString(),

        }));
        return { success: true, data: notifyMsg}

    }catch(error){
        console.error("unexpected error occured",error)
        return { success: false, message: 'An unexpected error occurred' }
    }
}