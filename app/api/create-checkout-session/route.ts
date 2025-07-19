"use server"

import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const { amount, currency, productName } = await req.json()

  if (!amount || !currency || !productName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    return NextResponse.json({ error: "Stripe secret key not set" }, { status: 500 })
  }

  // Instantiate Stripe at runtime (avoids build-time failure)
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: productName },
            unit_amount: amount,
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
