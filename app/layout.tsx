import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import BottomNav from "@/components/bottom-nav"
import MainHeader from "@/components/main-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "فروشگاه‌یار | فروشگاه‌ساز مینیمال",
  description: "فروشگاه‌ساز اینترنتی ساده برای ساخت ویترین آنلاین، معرفی محصول و راه‌اندازی سریع فروش.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head></head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <MainHeader />
          <div className="pb-20 md:pb-0">{children}</div>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
