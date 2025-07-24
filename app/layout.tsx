import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import BottomNav from "@/components/bottom-nav"
import GoogleMapsScriptLoader from "@/components/google-maps-script-loader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Finder - Local Business Directory",
  description: "Comprehensive platform for registering and searching local businesses with location-based features.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head></head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <GoogleMapsScriptLoader /> {/* No apiKey prop needed here */}
          <div className="pb-20 md:pb-0">{children}</div>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
