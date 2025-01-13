"use server"
import { db } from "@/app/lib/db"

export async function getvirtualProdOrder(){
    try{
        const vOrder=await db.virtualProductOnOrder.findMany({
            include:{
                VirtualProduct:true,
                Order:{
                    include:{
                        user:true
                    }
                }
            }
        });
        return{success:true,data:vOrder};
    } catch(error){
        console.error("Unexpected error:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
}

async function getuserById(userId:string){
    try{
        const user=await db.user.findUnique({
            where:{id:userId},
        })
        return {success:true,data:user}

    }
    catch(error){

         console.error("Unexpected error:", error);
        return { success: false, message: "An unexpected error occurr"}
    }
}