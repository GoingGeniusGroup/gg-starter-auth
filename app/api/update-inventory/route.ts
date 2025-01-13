import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db"; 

const stripe = new Stripe('sk_test_51QY6IbD3ncKQC69NzzPZBkLcRwT01yEMPKBGLD4TMDLp2R3r4CSRj56DSG25VkVT4WTKAPJct5TivQeEQdY4vlsX00dEXCBzn6'
);

export async function POST(req: Request) {
  const { sessionId, userId } = await req.json(); // Ensure userId is passed

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Parse cart items from metadata
    const cartItems = JSON.parse(session.metadata?.cartItems || '[]');

    let virtualProductId: string;

    await Promise.all(
      cartItems.map(async (item: { id: string; quantity: number; type: string }) => {
        if (item.type === 'virtual') {
          virtualProductId = item.id;
        }

        await db.virtualProduct.update({
          where: { id: item.id },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });

        const userInventory = await db.userInventory.findFirst({
          where: {
            userId: userId, 
            productId: item.id,
          },
        });

        // If the entry exists, update it. Otherwise, insert a new entry.
        if (userInventory) {
          await db.userInventory.update({
            where: { id: userInventory.id },
            data: {
              quantity: {
                increment: item.quantity,
              },
            },
          });
        } else {
          // Insert a new record if entry does not exist
          await db.userInventory.create({
            data: {
              userId: userId,
              productId: item.id,
              quantity: item.quantity,
            },
          });
        }

        await db.order.create({
          data: {
            userId: userId,
            orderDate: new Date(),
            orderQuantity: cartItems.reduce((total: number, item: any) => total + item.quantity, 0),
            streetAddress: "Chabahil",
            state: "Kathmandu",
            city: "Kathmandu",
            orderStatus: 'DELIVERED',
            orderAmount: (session.amount_total ?? 0) / 100,
            paymentStatus: true,
            // virtualProducts: {
            //   create: cartItems.map((item: any) => ({
            //     virtualProductId: item.id,
            //   }))
            // }
          }
        });
      })
    );

    console.log("Inventory updated successfully");

    console.log("Order created successfully with virtual product");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating inventory:", error);
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 });
  }
}