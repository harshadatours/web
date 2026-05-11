"use client"

import React, { useState, useEffect } from 'react'
import { Users as UsersIcon, Shield, Mail, MoreVertical, ShieldCheck, UserMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchUsers = async () => {
      // In a real app, you'd fetch from a 'profiles' table linked to auth.users
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      setUsers(data || [])
      setIsLoading(false)
    }
    fetchUsers()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">User <span className="text-primary italic">Management</span></h1>
        <p className="text-slate-400">View and manage all registered customers and their account status.</p>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">User</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Contact</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Role</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">Joined Date</th>
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
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-white">{user.full_name || user.email.split('@')[0]}</p>
                          <p className="text-[10px] text-slate-500 font-mono">ID: {user.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <Mail className="w-3 h-3 text-primary" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "text-[10px] font-black uppercase px-2 py-1 rounded-lg",
                        user.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                      )}>
                        {user.role || 'customer'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary">
                          <ShieldCheck className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-500">
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-500">
                    <div className="space-y-4">
                      <p>No registered users found.</p>
                      <p className="text-xs">Ensure you have created a 'profiles' table in Supabase.</p>
                    </div>
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
