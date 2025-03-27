"use server"
import { db } from "@/lib/db";

export async function getTopProducts(){
    try{
        const topPhysicalProducts = await db.productOnOrder.groupBy({
            by: ["productId"],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: "desc" } },
            take: 5, 
          });

          const physicalProducts = await db.product.findMany({
            where: { id: { in: topPhysicalProducts.map((p) => p.productId) } },
            select: { id: true, name: true },
          });
      
          // Map physical product sales
          const physicalProductSales = topPhysicalProducts.map((p) => ({
            id: p.productId,
            name: physicalProducts.find((prod) => prod.id === p.productId)?.name || "Unknown",
            totalSold: p._sum.quantity || 0,
            productType:"Physical"
          }));


          const topVirtualProducts = await db.virtualProductOnOrder.groupBy({
            by: ["virtualProductId"],
            _sum: { quantity: true },
            orderBy: { _sum: { quantity: "desc" } },
            take: 5, 
          });
      
          // Fetch virtual product details
          const virtualProducts = await db.virtualProduct.findMany({
            where: { id: { in: topVirtualProducts.map((vp) => vp.virtualProductId) } },
            select: { id: true, name: true },
          });

          const virtualProductSales = topVirtualProducts.map((vp) => ({
            id: vp.virtualProductId,
            name: virtualProducts.find((vProd) => vProd.id === vp.virtualProductId)?.name || "Unknown",
            totalSold: vp._sum.quantity || 0,
            productType:"Virtual"
          }));

          const topSellingProducts = [...physicalProductSales, ...virtualProductSales].sort(
            (a, b) => b.totalSold - a.totalSold
          );
          return{success:true,data:topSellingProducts}
    }
    catch(error){
        console.error("Error fetching the data", error);
        return { success: false, message: "An unexpected error occurred" };
    }
}