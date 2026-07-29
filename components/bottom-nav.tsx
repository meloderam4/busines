"use client"

import { Home, PackagePlus, Sparkles, Tags, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "خانه" },
  { href: "/#builder", icon: PackagePlus, label: "ساخت", special: true },
  { href: "/#features", icon: Sparkles, label: "امکانات" },
  { href: "/#pricing", icon: Tags, label: "پلن‌ها" },
  { href: "/login", icon: User, label: "ورود" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 shadow-lg backdrop-blur md:hidden" dir="rtl">
      <div className="mx-auto flex max-w-md items-center justify-around px-3 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-14 flex-col items-center justify-center rounded-xl px-2 py-1 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
              )}
            >
              <span
                className={cn(
                  "mb-1 flex h-8 w-8 items-center justify-center rounded-full",
                  item.special && "bg-primary text-primary-foreground shadow-lg",
                  isActive && !item.special && "bg-primary/10",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className={cn(isActive && "font-bold")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
      <div className="h-safe-area-inset-bottom bg-card/95" />
    </nav>
  )
}
