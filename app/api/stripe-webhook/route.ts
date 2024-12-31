import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe('sk_test_51QY6IbD3ncKQC69NzzPZBkLcRwT01yEMPKBGLD4TMDLp2R3r4CSRj56DSG25VkVT4WTKAPJct5TivQeEQdY4vlsX00dEXCBzn6', {
  apiVersion: "2024-12-18.acacia",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = 'whsec_62ab313976081fc5b31bd9c3c9ee4c4330cb60b4067c301677f1d184f45e1ab6';
  let event;

  try {
    const rawBody = await req.text();
    if (!sig) {
      console.error("Stripe signature is missing");
      return NextResponse.json({ error: "Stripe signature is missing" }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    console.error(`Webhook signature verification failed: ${err}`);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const cartItems = JSON.parse(session.metadata?.cartItems || "[]");

      await Promise.all(
        cartItems.map(async (item: { id: string; quantity: number }) => {
          // Decrement stock quantity in Product table
          await db.product.update({
            where: { id: item.id },
            data: {
              stockQuantity: {
                decrement: item.quantity,
              },
            },
          });
      
          // Check if the entry already exists in UserInventory
          const userInventory = await db.userInventory.findFirst({
            where: {
              userId: '3d462102-36e8-4718-959a-f750f1fbd8b2',  
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
            // If the entry does not exist, insert a new record
            await db.userInventory.create({
              data: {
                userId: '3d462102-36e8-4718-959a-f750f1fbd8b2',  
                productId: item.id,
                quantity: item.quantity,  
              },
            });
          }
        })
      );
      console.log("Inventory updated successfully");
    } catch (error) {
      console.error("Error updating inventory:", error);
      return NextResponse.json({ error: "Error updating inventory" }, { status: 500 });
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ success: true });
}