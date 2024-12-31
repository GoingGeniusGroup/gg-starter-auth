import { NextResponse } from "next/server";
const stripe = require('stripe')('sk_test_51QY6IbD3ncKQC69NzzPZBkLcRwT01yEMPKBGLD4TMDLp2R3r4CSRj56DSG25VkVT4WTKAPJct5TivQeEQdY4vlsX00dEXCBzn6');

export async function GET() {

    const session = await stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Macbook Pro',
                    },
                    unit_amount: 1000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
    });

    return NextResponse.json({ message: session });
}
