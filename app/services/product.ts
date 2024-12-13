import { db } from "@/lib/db";


export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
       
        description: true,
        quantityInStock: true,
      
        salePrice: true,
        costPrice: true,
        status: true,
        category:{
            select:{
                categoryName:true
            }
        }
       
      },
     
    });

    return products
  } catch (error) {
    console.log(error);
    
    return null
  }
};
