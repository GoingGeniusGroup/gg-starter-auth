
"use server"
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";



export const getCategories = cache(
    async (fromClient:boolean= false) => {
     try {
          const categories = await db.category.findMany({
           select: {
               id: true,
               categoryName:true,
               description:true
           }
          })
   
          if(fromClient){
           const categoriesClient = categories.map((category) =>(
               {  
                   id:category.id,
                   label: category.categoryName,
                   value: category.categoryName.toUpperCase()
               }
           ))
           return categoriesClient
         }
         return categories;
     } catch (error) {
        return null
        
     }

       
},
["admin/categories", "getCategories"],
  { revalidate: 60 * 60 * 24 }
)