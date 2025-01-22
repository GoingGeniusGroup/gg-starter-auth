"use server"
import { db } from "@/lib/db";

export async function getUserDetail(userId:string){
    try{
        const user = await db.user.findUnique({
            where: {id: userId },})
        
          if(!user){
            return { success: false, message: 'NO user found' }
          }
          return { success: true, data: user }
  
    }
    catch(error){
        console.error("unexpected error occured",error)
        return { success: false, message: 'An unexpected error occurred' }
  
    }
  
  }