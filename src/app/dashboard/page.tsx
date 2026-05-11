"use client"

import React, { useState, useEffect } from 'react'
import { Plane, Car, Heart, CreditCard, ArrowUpRight, ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { type User as SupabaseUser } from '@supabase/supabase-js'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select('*, cars(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        
        setBookings(bookingsData || [])
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const stats = [
    { name: 'Total Bookings', value: bookings.length.toString(), icon: Plane, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Active Rentals', value: bookings.filter(b => b.status === 'confirmed').length.toString(), icon: Car, color: 'text-primary', bg: 'bg-primary/10' },
    { name: 'Wishlist Items', value: '0', icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
    { name: 'Total Spent', value: `₹${bookings.reduce((acc, b) => acc + (b.total_price || 0), 0).toLocaleString()}`, icon: CreditCard, color: 'text-green-500', bg: 'bg-green-500/10' },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-black mb-2">Welcome Back, <span className="text-primary italic">{user?.email?.split('@')[0] || 'User'}</span></h1>
        <p className="text-muted-foreground">Here's what's happening with your travel plans today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-8 rounded-[2rem] border-white/20 shadow-xl">
            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.name}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <div className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-lg">
                <ArrowUpRight className="w-3 h-3" />
                +12%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Recent Bookings */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent <span className="text-primary italic">Bookings</span></h2>
            <Button variant="ghost" size="sm" className="rounded-full">View All</Button>
          </div>
          
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="glass p-6 rounded-3xl border-white/20 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden relative bg-primary/10 flex items-center justify-center">
                      {booking.cars?.images?.[0] ? (
                        <img src={booking.cars.images[0]} alt="Car" className="w-full h-full object-cover" />
                      ) : (
                        <Car className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{booking.cars?.name || 'Unknown Car'}</h4>
                      <p className="text-sm text-muted-foreground">Booking ID: #{booking.id.slice(0, 8)}</p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block mr-12">
                    <p className="text-sm font-bold">₹{booking.total_price?.toLocaleString()}</p>
                    <p className={cn(
                      "text-[10px] font-black uppercase px-2 py-0.5 rounded-lg inline-block",
                      booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    )}>{booking.status}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="glass p-12 rounded-[2.5rem] border-white/10 text-center space-y-4">
                <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No Bookings Yet</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">You haven't made any bookings yet. Ready to plan your next journey?</p>
                <Button asChild className="rounded-2xl h-12 px-8 mt-4">
                  <Link href="/cars">Explore Fleet</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Quick <span className="text-primary italic">Actions</span></h2>
          <div className="glass p-8 rounded-[2.5rem] border-primary/20 bg-primary/5 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">Planning your next trip? Let's get you on the road!</p>
            <Button asChild className="w-full h-14 rounded-2xl font-bold" variant="default">
              <Link href="/cars">Book a Car</Link>
            </Button>
            <Button asChild className="w-full h-14 rounded-2xl font-bold" variant="outline">
              <Link href="/dashboard/bookings">View My Bookings</Link>
            </Button>
            <hr className="border-foreground/5 my-4" />
            <p className="text-xs text-muted-foreground text-center">Need support? Contact us 24/7</p>
          </div>
        </div>
      </div>
    </div>
  )
}
