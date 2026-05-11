"use client"

import React, { useState, useEffect } from 'react'
import { History, Car, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { type User as SupabaseUser } from '@supabase/supabase-js'
import { cn } from '@/lib/utils'

export default function BookingsPage() {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My <span className="text-primary italic">Bookings</span></h1>
        <p className="text-muted-foreground">Manage and track all your car rental bookings here.</p>
      </div>

      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="glass p-6 rounded-3xl border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden relative bg-primary/10 flex items-center justify-center shrink-0">
                  {booking.cars?.images?.[0] ? (
                    <img src={booking.cars.images[0]} alt="Car" className="w-full h-full object-cover" />
                  ) : (
                    <Car className="w-10 h-10 text-primary" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{booking.cars?.name || 'Unknown Car'}</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <p>Booking ID: #{booking.id.slice(0, 8)}</p>
                    <p>Date: {new Date(booking.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto">
                <div className="text-left md:text-right">
                  <p className="text-lg font-bold text-white">₹{booking.total_price?.toLocaleString()}</p>
                  <span className={cn(
                    "text-[10px] font-black uppercase px-2 py-1 rounded-lg inline-block",
                    booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 
                    booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 
                    'bg-yellow-500/10 text-yellow-500'
                  )}>
                    {booking.status}
                  </span>
                </div>
                <Button variant="outline" className="rounded-xl px-6 h-12">
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass p-20 rounded-[3rem] border-white/10 text-center space-y-6">
            <div className="w-24 h-24 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <History className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold">No History Found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">It looks like you haven't made any bookings with us yet. Start your journey today!</p>
            <Button asChild size="lg" className="rounded-2xl h-14 px-10">
              <Link href="/cars">Book Your First Car</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
