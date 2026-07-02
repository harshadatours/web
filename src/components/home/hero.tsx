"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWhatsAppUrl } from '@/utils/whatsapp'

import { useRouter } from 'next/navigation'
import { TOURS } from '@/lib/data'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!searchQuery.trim()) return

    const query = searchQuery.trim().toLowerCase()
    
    const matchedTour = TOURS.find(tour => 
      tour.title.toLowerCase().includes(query) || 
      tour.destination.toLowerCase().includes(query)
    )

    if (matchedTour) {
      router.push(`/tours/${matchedTour.slug}`)
    } else {
      const confirmed = window.confirm("Tour is available but not yet added in web. Contact directly via WhatsApp?")
      if (confirmed) {
        const message = `Hello Harshada Tours and Travels,\n\nI want to plan a tour to: *${searchQuery.trim()}*.\nPlease let me know the availability and details.`
        const whatsappUrl = getWhatsAppUrl('919172936138', message)
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-raigad-bg.png"
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

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative glass p-2 md:p-3 rounded-full flex flex-col sm:flex-row items-center gap-2 md:gap-4 border-white/30 shadow-2xl">
            <div className="flex-1 w-full relative flex items-center pl-4">
              <Search className="w-5 h-5 text-primary shrink-0" />
              <input 
                type="text"
                placeholder="Where do you want to travel? (e.g. Mahabaleshwar)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/60 px-4 py-3 outline-none"
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto h-12 md:h-14 rounded-full px-8 text-base font-bold shadow-xl shadow-primary/20">
              Search & Book
            </Button>
          </form>
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
