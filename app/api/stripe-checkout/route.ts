import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QY6IbD3ncKQC69NzzPZBkLcRwT01yEMPKBGLD4TMDLp2R3r4CSRj56DSG25VkVT4WTKAPJct5TivQeEQdY4vlsX00dEXCBzn6"
);

export async function POST(request: Request) {
  const { cartItems } = await request.json();

  const lineItems = cartItems.map(
    (item: {
      name: string;
      price: number;
      quantity: number;
      images: [string];
    }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.images[0]],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })
  );

  // Calculate total amount
  const totalAmount = lineItems.reduce((sum: number, item: { price_data: { unit_amount: number; }; quantity: number; }) => {
    return sum + item.price_data.unit_amount * item.quantity;
  }, 0);

  // Extract only necessary fields for metadata
  const simplifiedCartItems = cartItems.map(
    (item: { id: number; quantity: number }) => ({
      id: item.id,
      quantity: item.quantity,
    })
  );

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&amount=${totalAmount}&transaction_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "https://example.com/cancel",
    line_items: lineItems,
    mode: "payment",
    metadata: {
      cartItems: JSON.stringify(simplifiedCartItems),
    },
  });

  return NextResponse.json({ message: session });
}
