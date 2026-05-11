"use client"

import React, { useState, useEffect } from 'react'
import { User, Mail, Shield, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { type User as SupabaseUser } from '@supabase/supabase-js'

export default function ProfilePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">My <span className="text-primary italic">Profile</span></h1>
        <p className="text-muted-foreground">Manage your personal information and account details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-10 rounded-[2.5rem] border-white/10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Full Name</label>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <input type="text" defaultValue={user?.email?.split('@')[0]} className="bg-transparent border-none outline-none w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Email Address</label>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <input type="email" value={user?.email || ''} readOnly className="bg-transparent border-none outline-none w-full text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Phone Number</label>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <input type="tel" placeholder="+91 00000 00000" className="bg-transparent border-none outline-none w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Account Status</label>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-green-500 font-bold">Verified</span>
                </div>
              </div>
            </div>
            <Button className="h-14 px-10 rounded-2xl font-bold">Update Profile</Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border-white/10 text-center space-y-6">
            <div className="w-32 h-32 rounded-full bg-primary/20 border-4 border-primary mx-auto overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{user?.email?.split('@')[0]}</h3>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
            <Button variant="outline" className="w-full h-12 rounded-xl">Change Avatar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
