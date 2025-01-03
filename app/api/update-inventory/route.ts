import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db"; // Replace with your database client setup

const stripe = new Stripe('sk_test_51QY6IbD3ncKQC69NzzPZBkLcRwT01yEMPKBGLD4TMDLp2R3r4CSRj56DSG25VkVT4WTKAPJct5TivQeEQdY4vlsX00dEXCBzn6'
);

export async function POST(req: Request) {
  const { sessionId, userId } = await req.json(); // Ensure userId is passed

  try {
    // Fetch the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Parse cart items from metadata
    const cartItems = JSON.parse(session.metadata?.cartItems || '[]');

    // Update inventory using Promise.all for concurrent processing
    await Promise.all(
      cartItems.map(async (item: { id: string; quantity: number }) => {
        // Decrement stock quantity in Product table
        await db.virtualProduct.update({
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
            userId: userId, // Make sure `userId` is included in the request body
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
      })
    );

    console.log("Inventory updated successfully");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating inventory:", error);
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 });
  }
}