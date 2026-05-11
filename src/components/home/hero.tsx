"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Travel Background"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Premium <span className="text-primary italic">Car Rentals</span> <br />
            for Your Every Journey
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            Luxury car rentals and professional chauffeur services from Pune to across Maharashtra. Experience comfort, safety, and reliability.
          </p>
        </motion.div>

        {/* Search Bar / Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass rounded-[2rem] p-6 md:p-8 shadow-2xl border-white/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-end">
              {/* Destination */}
              <div className="text-left">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block ml-1">Destination</label>
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 border border-white/10">
                  <MapPin className="text-primary w-4 h-4 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Where to?" 
                    className="bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50 w-full text-sm"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="text-left">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block ml-1">Travel Date</label>
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 border border-white/10">
                  <Calendar className="text-primary w-4 h-4 shrink-0" />
                  <input 
                    type="date" 
                    className="bg-transparent border-none focus:ring-0 text-white w-full text-sm [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className="text-left">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block ml-1">Service</label>
                <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-3 border border-white/10">
                  <Car className="text-primary w-4 h-4 shrink-0" />
                  <select className="bg-transparent border-none focus:ring-0 text-white w-full text-sm appearance-none outline-none">
                    <option className="bg-slate-900">Local Rental</option>
                    <option className="bg-slate-900">Outstation Trip</option>
                    <option className="bg-slate-900">Airport Transfer</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <Button size="lg" className="h-12 md:h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20">
                <Search className="mr-2 w-4 h-4" />
                Find Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements / Accents */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="glass px-6 py-4 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="text-white font-bold">10k+</p>
            <p className="text-white/60 text-xs">Happy Travelers</p>
          </div>
        </div>
      </div>
    </section>
  )
}
