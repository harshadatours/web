"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, Eye, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'

export default function AdminCarsPage() {
  const [cars, setCars] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false })
      
      setCars(data || [])
      setIsLoading(false)
    }
    fetchCars()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage <span className="text-primary italic">Cars</span></h1>
          <p className="text-slate-400">Add, edit or remove vehicles from the fleet.</p>
        </div>
        <Button className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5 mr-2" />
          Add New Car
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search cars by name, brand, type..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-1 focus:ring-primary/40 outline-none"
          />
        </div>
        <select className="bg-white/5 border border-white/10 rounded-xl py-3 px-6 text-sm outline-none focus:ring-1 focus:ring-primary/40">
          <option>All Types</option>
          <option>SUV</option>
          <option>Sedan</option>
          <option>Luxury</option>
        </select>
      </div>

      {/* Cars Table */}
      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Car Details</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Type</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Price/Day</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary mx-auto"></div>
                  </td>
                </tr>
              ) : cars.length > 0 ? (
                cars.map((car) => (
                  <tr key={car.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary overflow-hidden">
                          {car.images?.[0] ? (
                            <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover" />
                          ) : (
                            <Car className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white">{car.name}</p>
                          <p className="text-xs text-slate-500">{car.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-slate-300">{car.type}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-bold text-white">₹{car.price_per_day}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "text-[10px] font-black uppercase px-2 py-1 rounded-lg",
                        car.is_available ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      )}>
                        {car.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-500">
                    No cars found in the database.
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
