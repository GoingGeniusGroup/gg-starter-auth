"use server"
import { db } from "@/lib/db";

export const getAllTotals = async () => {
    try {
      
      const [
        productsCount,
        categoriesCount,
        suppliersCount,
        usersCount,
        virtualCategoryCount,
        virtualProductCount,
        virtualProductOnOrderCount,
        orderCount,
        stockTotal
      ] = await Promise.all([
        db.product.count(),
        db.category.count(),
        db.supplier.count(),
        db.user.count(),
        db.virtualCategory.count(),
        db.virtualProduct.count(),
        db.virtualProductOnOrder.count(),
        db.order.count(),
        db.product.aggregate({
          _sum: {
            stockQuantity: true,
          },
        }),
      ]);
  
      return {
        productsTotal: productsCount,
        categoriesTotal: categoriesCount,
        suppliersTotal: suppliersCount,
        usersTotal: usersCount,
        virCatTotal:virtualCategoryCount,
        vpTotal:virtualProductCount,
        vpOrderTotal:virtualProductOnOrderCount,
        orderTotal:orderCount,
        stockTotal: stockTotal?._sum.stockQuantity || 0,
      };
    }
    catch(error){
        console.error(error)
    }
}
      
    
    
  
    
    
  
    
   
  
     
    