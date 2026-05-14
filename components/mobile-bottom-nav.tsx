"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, Home, LineChart, ScanLine, User } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/commodities", label: "Market", icon: LineChart },
  { href: "/ai-assistant", label: "AI Tani", icon: Bot },
  { href: "/scan", label: "Scan", icon: ScanLine },
  { href: "/profile", label: "Profile", icon: User },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-2 pb-2 pt-1 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden dark:border-gray-800 dark:bg-gray-950/95">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-xl px-1 py-1.5 text-[10px] font-bold transition ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                  : "text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-900"
              }`}
            >
              <Icon className="mb-0.5 h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
