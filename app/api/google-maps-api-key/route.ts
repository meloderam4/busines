import { NextResponse } from "next/server"

export async function GET() {
  // Access the server-only environment variable
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key not configured." }, { status: 500 })
  }

  return NextResponse.json({ apiKey })
}
