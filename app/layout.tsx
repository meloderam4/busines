import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "بیزینس یاب - دایرکتوری کسب‌وکارهای محلی",
  description: "پلتفرم جامع ثبت و جست‌وجوی کسب‌وکارهای محلی با قابلیت مکان‌یاب",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className={`${inter.className} font-vazir`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
