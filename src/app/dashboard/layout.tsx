"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, History, Heart, User, Settings, LogOut, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from '@/actions/auth'
import { createClient } from '@/utils/supabase/client'
import { type User as SupabaseUser } from '@supabase/supabase-js'

const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Bookings', href: '/dashboard/bookings', icon: History },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<SupabaseUser | null>(null)
  const supabase = createClient()

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-80 hidden lg:flex flex-col border-r border-foreground/5 p-8 bg-card/30 backdrop-blur-3xl sticky top-0 h-screen">
        <Link href="/" className="flex items-center gap-3 mb-12 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110">H</div>
          <span className="text-xl font-bold">Harshada <span className="text-primary italic">Rentals</span></span>
        </Link>

        <nav className="flex-1 space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-foreground/5"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <button
          onClick={() => signOut()}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-medium mt-auto"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 border-b border-foreground/5 bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="w-full bg-foreground/5 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user?.email?.split('@')[0] || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'User'}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
