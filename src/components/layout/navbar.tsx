"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, User, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import { type User as SupabaseUser } from '@supabase/supabase-js'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Car Rental', href: '/cars' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()

  // Hide navbar on dashboard routes to prevent clashing
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Initial user fetch
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      subscription.unsubscribe()
    }
  }, [])

  if (isDashboard) return null

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4',
        isScrolled ? 'top-2' : 'top-0'
      )}
    >
      <nav
        className={cn(
          'max-w-7xl mx-auto rounded-full transition-all duration-300 px-6 py-3 flex items-center justify-between',
          isScrolled ? 'glass shadow-lg border-white/40' : 'bg-transparent'
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src="/logo.png"
              alt="Harshada Tours Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className={cn(
            "font-bold text-lg md:text-xl tracking-tight hidden sm:block",
            isScrolled ? "text-foreground" : "text-white"
          )}>
            Harshada <span className="text-primary">Tours</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isScrolled ? "text-foreground/80" : "text-white/90"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "hidden lg:flex items-center gap-2",
              isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
            )}
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs">+91 9172936138</span>
          </Button>
          
          {user ? (
            <Button
              asChild
              variant={isScrolled ? "default" : "glass"}
              size="sm"
              className="rounded-full px-5"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant={isScrolled ? "default" : "glass"}
              size="sm"
              className="rounded-full px-5"
            >
              <Link href="/login" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </Button>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={cn("w-6 h-6", !isScrolled && !mobileMenuOpen ? "text-white" : "text-foreground")} />
            ) : (
              <Menu className={cn("w-6 h-6", !isScrolled ? "text-white" : "text-foreground")} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 glass rounded-3xl p-6 shadow-2xl md:hidden z-40 border-white/40"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium px-4 py-2 rounded-xl hover:bg-primary/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-foreground/10" />
              <div className="flex items-center justify-between px-4">
                <span className="text-sm text-muted-foreground">+91 9172936138</span>
                <Button size="sm" className="rounded-full">Book Now</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
