"use client"

import React from 'react'
import { Bell, Lock, Eye, Globe, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const settingsGroups = [
    {
      title: 'Security',
      items: [
        { name: 'Password', desc: 'Change your account password', icon: Lock },
        { name: 'Two-Factor Authentication', desc: 'Add an extra layer of security', icon: Shield },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { name: 'Notifications', desc: 'Manage your email and push alerts', icon: Bell },
        { name: 'Dark Mode', desc: 'Toggle between light and dark themes', icon: Moon },
        { name: 'Language', desc: 'Choose your preferred language', icon: Globe },
      ]
    }
  ]

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Account <span className="text-primary italic">Settings</span></h1>
        <p className="text-muted-foreground">Customize your experience and manage account security.</p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {settingsGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary ml-4">{group.title}</h3>
            <div className="glass rounded-[2.5rem] border-white/10 overflow-hidden divide-y divide-white/5">
              {group.items.map((item) => (
                <div key={item.name} className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="rounded-xl px-6">Configure</Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}
