"use client"

import { Menu, Store, User, X, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/#builder", label: "سازنده" },
  { href: "/#features", label: "امکانات" },
  { href: "/#pricing", label: "قیمت‌گذاری" },
]

export default function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-xl" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 font-black text-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Store className="h-5 w-5" />
            </span>
            <span className="text-xl">فروشگاه‌یار</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                className={cn(pathname === item.href && "bg-secondary text-primary")}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">
                <User className="h-4 w-4" />
                ورود
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/#builder">
                <Zap className="h-4 w-4" />
                ساخت فروشگاه
              </Link>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen((value) => !value)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">باز کردن منو</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <Button key={item.href} asChild variant="ghost" className="w-full justify-start">
                <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              </Button>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button asChild variant="outline" className="bg-background">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  ورود
                </Link>
              </Button>
              <Button asChild>
                <Link href="/#builder" onClick={() => setIsMenuOpen(false)}>
                  شروع
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
