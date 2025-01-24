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

export async function updateUserDetail(formData:FormData,userId:string){
    const data = {
        fullName: formData.get("fullName") as string,
        userName: formData.get("userName")?.toString()?.split(",") || [],
        email: formData.get("email")?.toString()?.split(",") || [],
        mobilePhone: formData.get("mobilePhone")?.toString()?.split(",") || [],
        address: formData.get("address")?.toString()?.split(",") || [],
        imageUser:Array.from(formData.getAll("imageUser")) as string[]
      };
      try{
        const existingUser = await db.user.findUnique({
            where: { id: userId },
          });
      
          if (!existingUser) {
            return { success: false, message: "User not found" };
          }
          //check for duplicate emails of user
          const duplicateEmail = await db.user.findUnique({
            where: { email: data.email },
          });
      
          if (duplicateEmail && duplicateEmail.id !== userId) {
            return { success: false, message: "Email must be unique" };
          }

          const updatedUser=await db.user.update({
            where:{id:userId},
            data: data
          });
          return{success:true,data:updatedUser}
      }
      catch(error){
        console.error("something went wrong",error)
        return { success: false, message: "An unexpected error occurred" };

      }

}