"use client"

import { useState, useEffect } from "react"
import { Home, Search, Plus, Heart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function BottomNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down
          setIsVisible(false)
        } else {
          // Scrolling up
          setIsVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Home",
      isActive: pathname === "/",
    },
    {
      href: "/search",
      icon: Search,
      label: "Search",
      isActive: pathname === "/search",
    },
    {
      href: "/business/register",
      icon: Plus,
      label: "Add Business",
      isActive: pathname === "/business/register",
      isSpecial: true,
    },
    {
      href: "/favorites",
      icon: Heart,
      label: "Favorites",
      isActive: pathname === "/favorites",
    },
    {
      href: "/profile",
      icon: User,
      label: "Profile",
      isActive: pathname === "/profile" || pathname === "/login" || pathname === "/register",
    },
  ]

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-transform duration-300 md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px]",
                item.isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600",
                item.isSpecial && "relative",
              )}
            >
              {item.isSpecial ? (
                <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg transform -translate-y-2">
                  <Icon className="w-6 h-6" />
                </div>
              ) : (
                <Icon className={cn("w-6 h-6 mb-1", item.isActive && "scale-110")} />
              )}
              <span
                className={cn(
                  "text-xs transition-all duration-200",
                  item.isActive ? "font-semibold" : "font-normal",
                  item.isSpecial && "mt-1",
                )}
              >
                {item.label}
              </span>
              {item.isActive && !item.isSpecial && <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>}
            </Link>
          )
        })}
      </div>

      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white"></div>
    </nav>
  )
}
