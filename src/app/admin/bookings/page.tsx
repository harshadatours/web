"use client"

import React, { useState, useEffect } from 'react'
import { Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*, cars(*)')
        .order('created_at', { ascending: false })
      
      setBookings(data || [])
      setIsLoading(false)
    }
    fetchBookings()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage <span className="text-primary italic">Bookings</span></h1>
        <p className="text-slate-400">View and manage all customer car rental bookings.</p>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Booking ID</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Customer</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Vehicle</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Dates</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6 font-mono text-xs text-slate-400">#{booking.id.slice(0, 8)}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-white">Customer</p>
                      <p className="text-xs text-slate-500">ID: {booking.user_id?.slice(0, 8)}</p>
                    </td>
                    <td className="px-8 py-6 font-medium text-slate-300">{booking.cars?.name || 'N/A'}</td>
                    <td className="px-8 py-6">
                      <p className="text-xs text-white">{booking.start_date} to {booking.end_date}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "text-[10px] font-black uppercase px-2 py-1 rounded-lg flex items-center gap-1 w-fit",
                        booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 
                        booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                        'bg-red-500/10 text-red-500'
                      )}>
                        {booking.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
                        {booking.status === 'pending' && <Clock className="w-3 h-3" />}
                        {booking.status === 'cancelled' && <XCircle className="w-3 h-3" />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-500">
                    No bookings found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
