"use server"
import { db } from "@/lib/db";

export async function getUserOrderDetail(userId:string){
    try{
        const orders = await db.order.findMany({
            where: { userId },
            include: {
              product: true,
              VirtualProductOnOrder: {
                include: {
                  VirtualProduct: true,
                },
              },
              
            },
          });
          if(!orders){
            return { success: false, message: 'NO order found for this user' }
          }
          return { success: true, data: orders }

    }
    catch(error){
        console.error("unexpected error occured",error)
        return { success: false, message: 'An unexpected error occurred' }

    }

}