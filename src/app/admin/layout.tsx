"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutGrid, 
  Map as MapIcon, 
  CalendarCheck, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  PieChart
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from '@/actions/auth'

const adminLinks = [
  { name: 'Analytics', href: '/admin', icon: PieChart },
  { name: 'Manage Cars', href: '/admin/cars', icon: LayoutGrid },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'CMS & Blogs', href: '/admin/cms', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-200">
      {/* Admin Sidebar */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-white/5 p-6 bg-slate-900/50 backdrop-blur-2xl sticky top-0 h-screen">
        <Link href="/" className="flex items-center gap-3 mb-10 px-4 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110">H</div>
          <span className="text-lg font-bold tracking-tight text-white">Admin <span className="text-primary italic">Panel</span></span>
        </Link>

        <nav className="flex-1 space-y-1">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all text-sm font-medium w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-slate-900/30 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-lg font-semibold hidden md:block">System Overview</h2>
            <div className="relative w-64 ml-8 hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Global search..." 
                className="w-full bg-white/5 border-none rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-1 focus:ring-primary/40 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-slate-900" />
            </button>
            <div className="flex items-center gap-3 border-l border-white/5 pl-6">
              <div className="text-right">
                <p className="text-xs font-bold text-white">Admin User</p>
                <p className="text-[10px] text-primary font-medium uppercase tracking-tighter">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Admin" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
