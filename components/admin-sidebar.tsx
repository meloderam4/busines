"use client"

import { Home, Building2, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/admin",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/admin/businesses",
      icon: Building2,
      label: "Businesses",
    },
    {
      href: "/admin/users",
      icon: Users,
      label: "Users",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Settings",
    },
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 sticky top-0 h-screen">
      <div className="flex items-center justify-center h-16 border-b border-gray-700 mb-6">
        <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-md transition-colors",
              pathname === item.href ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto border-t border-gray-700 pt-4">
        <Link
          href="/"
          className="flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Back to Site</span>
        </Link>
      </div>
    </aside>
  )
}
