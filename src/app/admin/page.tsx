"use client"

import React, { useState, useEffect } from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Car
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { name: 'Total Revenue', value: '₹0', trend: '0%', isUp: true, icon: CreditCard, color: 'text-green-500' },
    { name: 'Total Bookings', value: '0', trend: '0%', isUp: true, icon: ShoppingBag, color: 'text-primary' },
    { name: 'Active Users', value: '0', trend: '0%', isUp: true, icon: Users, color: 'text-blue-500' },
    { name: 'Fleet Size', value: '0', trend: '0%', isUp: true, icon: Car, color: 'text-purple-500' },
  ])
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { count: carCount } = await supabase.from('cars').select('*', { count: 'exact', head: true })
      const { count: bookingCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true })
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      const { data: revenueData } = await supabase.from('bookings').select('total_price').eq('status', 'confirmed')
      
      const totalRevenue = revenueData?.reduce((acc, curr) => acc + (curr.total_price || 0), 0) || 0

      setStats([
        { name: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, trend: '+0%', isUp: true, icon: CreditCard, color: 'text-green-500' },
        { name: 'Total Bookings', value: (bookingCount || 0).toString(), trend: '+0%', isUp: true, icon: ShoppingBag, color: 'text-primary' },
        { name: 'Active Users', value: (userCount || 0).toString(), trend: '+0%', isUp: true, icon: Users, color: 'text-blue-500' },
        { name: 'Fleet Size', value: (carCount || 0).toString(), trend: '+0%', isUp: true, icon: Car, color: 'text-purple-500' },
      ])
      
      setIsLoading(false)
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Executive <span className="text-primary italic">Overview</span></h1>
          <p className="text-slate-400">Real-time performance analytics for Harshada Rentals.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
            Last 30 Days
          </button>
          <button className="bg-primary px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg shadow-primary/20">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-1">{stat.name}</p>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl text-center">
            <h3 className="text-lg font-bold mb-4">Revenue Growth</h3>
            <div className="h-80 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl">
                <TrendingUp className="w-12 h-12 text-slate-700 mb-4" />
                <p className="text-slate-500">Not enough data to generate charts yet.</p>
            </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl text-center">
            <h3 className="text-lg font-bold mb-4">Monthly Bookings</h3>
            <div className="h-80 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl">
                <ShoppingBag className="w-12 h-12 text-slate-700 mb-4" />
                <p className="text-slate-500">Not enough data to generate charts yet.</p>
            </div>
        </div>
      </div>
    </div>
  )
}
