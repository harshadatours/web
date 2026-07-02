"use client"

import React from 'react'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Contact <span className="text-primary italic">Us</span></h1>
            <p className="text-slate-400 text-lg">We are here to help you with your car rental needs. Reach out to us anytime.</p>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-8 text-center">Get in <span className="text-primary italic">Touch</span></h2>
              <div className="space-y-6">
                <div className="flex items-start gap-5 p-6 glass rounded-3xl border-white/20">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Phone Number</p>
                    <p className="text-muted-foreground">+91 9172936138</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-6 glass rounded-3xl border-white/20">
                  <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Email Address</p>
                    <p className="text-muted-foreground">harshadatourstravels6138@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button size="lg" className="w-full h-16 rounded-2xl text-lg font-bold gap-3 bg-linear-to-r from-[#25D366] to-[#128C7E] hover:scale-105 transition-transform" onClick={() => window.open('https://wa.me/919172936138', '_blank', 'noopener,noreferrer')}>
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
