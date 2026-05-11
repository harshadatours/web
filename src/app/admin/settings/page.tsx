"use client"

import React from 'react'
import { Settings as SettingsIcon, ShieldCheck, Database, Globe, Sliders } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">System <span className="text-primary italic">Settings</span></h1>
        <p className="text-slate-400">Configure global platform parameters and security.</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {[
          { name: 'General Settings', desc: 'Site name, contact info, and branding', icon: Sliders },
          { name: 'Database Configuration', desc: 'Supabase connection and backups', icon: Database },
          { name: 'Security & Auth', desc: 'Admin permissions and login rules', icon: ShieldCheck },
          { name: 'Localization', desc: 'Currency, timezone, and language', icon: Globe },
        ].map((item) => (
          <div key={item.name} className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between group hover:bg-white/[0.02] transition-colors cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <item.icon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{item.name}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
            <Button variant="ghost" className="rounded-xl">Configure</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
