import React from 'react'
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const tours = [
  { id: '1', title: 'Mahabaleshwar Weekend', price: 3500, status: 'Active', bookings: 45, category: 'Hill Station' },
  { id: '2', title: 'Konkan Beach Paradise', price: 5999, status: 'Active', bookings: 120, category: 'Beach' },
  { id: '3', title: 'Spiritual Shirdi Tour', price: 1500, status: 'Draft', bookings: 0, category: 'Spiritual' },
  { id: '4', title: 'Lonavala Bliss', price: 2999, status: 'Active', bookings: 89, category: 'Hill Station' },
]

export default function AdminToursPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage <span className="text-primary italic">Tours</span></h1>
          <p className="text-slate-400">Add, edit or remove tour packages from the platform.</p>
        </div>
        <Button className="h-12 px-6 rounded-xl font-bold shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5 mr-2" />
          Create New Tour
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search tours by name, category..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-1 focus:ring-primary/40 outline-none"
          />
        </div>
        <select className="bg-white/5 border border-white/10 rounded-xl py-3 px-6 text-sm outline-none focus:ring-1 focus:ring-primary/40">
          <option>All Categories</option>
          <option>Hill Station</option>
          <option>Beach</option>
          <option>Spiritual</option>
        </select>
      </div>

      {/* Tours Table */}
      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Tour Package</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Category</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Price</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Bookings</th>
              <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      {tour.title[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">{tour.title}</p>
                      <p className="text-xs text-slate-500">ID: #T-{tour.id}823</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm text-slate-300">{tour.category}</span>
                </td>
                <td className="px-8 py-6">
                  <span className="font-bold text-white">₹{tour.price}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={cn(
                    "text-[10px] font-black uppercase px-2 py-1 rounded-lg",
                    tour.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  )}>
                    {tour.status}
                  </span>
                </td>
                <td className="px-8 py-6 font-medium text-slate-400">
                  {tour.bookings} Sales
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
