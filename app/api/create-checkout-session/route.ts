import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // Use the latest API version
})

export async function POST(req: Request) {
  try {
    const { amount, currency, productName } = await req.json()

    if (!amount || !currency || !productName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
            },
            unit_amount: amount, // amount in smallest currency unit (e.g., cents for USD, rials for IRR)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/business/register?success=true`,
      cancel_url: `${req.headers.get("origin")}/business/register?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Stripe checkout session creation failed:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
