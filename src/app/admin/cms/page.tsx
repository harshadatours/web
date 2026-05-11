"use client"

import React from 'react'
import { FileText, Layout, PenTool, Image as ImageIcon } from 'lucide-react'

export default function AdminCMSPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Content <span className="text-primary italic">Management</span></h1>
        <p className="text-slate-400">Manage your website content and media assets.</p>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-20 text-center space-y-6">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Layout className="w-12 h-12 text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-white">CMS Modules Coming Soon</h3>
          <p className="text-slate-400 max-w-sm mx-auto">This section will allow you to edit page content, manage the media library, and write blog posts.</p>
        </div>
      </div>
    </div>
  )
}
