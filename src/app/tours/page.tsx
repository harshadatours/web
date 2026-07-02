"use client"

import React, { useState, useEffect } from 'react'
import { TourCard } from '@/components/tours/tour-card'
import { TOURS, SERVICES } from '@/lib/data'
import { Search, MessageCircle, Navigation2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWhatsAppUrl } from '@/utils/whatsapp'

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredServices, setFilteredServices] = useState<string[]>(SERVICES)

  useEffect(() => {
    if (!searchTerm) {
      setFilteredServices(SERVICES)
    } else {
      setFilteredServices(
        SERVICES.filter(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [searchTerm])

  const handleServiceWhatsApp = (serviceName: string) => {
    const message = `Hello Harshada Tours and Travels,\n\nI would like to inquire about/book the service: *${serviceName}*.\n\nPlease provide me with details on rates, vehicle options, and availability.`
    const url = getWhatsAppUrl('919172936138', message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Curated Tour Packages Section */}
        <div className="mb-16">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Curated <span className="text-primary italic">Tour Packages</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explore the hidden gems of Maharashtra with our expert-led tour packages. Luxury, comfort, and memories guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {TOURS.map((tour) => (
              <TourCard key={tour.id} tour={{ ...tour, rating: 4.8 }} />
            ))}
          </div>
        </div>

        <hr className="border-white/10 my-16" />

        {/* Trips & Services Section */}
        <div>
          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">All Trips & <span className="text-primary italic">Cab Services</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              We offer instant cab bookings, outstation travel, local rentals, and customized tours. Search your route below and book directly via WhatsApp.
            </p>
          </div>

          {/* Search Bar for Services */}
          <div className="glass rounded-[2rem] p-4 mb-10 flex items-center gap-4 border-white/30 max-w-2xl">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search trip (e.g. Pune to Mumbai, Airport Taxi...)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary/50 transition-all outline-none text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
                <div 
                  key={index}
                  className="glass p-6 rounded-3xl border-white/15 flex flex-col justify-between hover:scale-[1.03] hover:bg-white/5 transition-all duration-300 relative group overflow-hidden shadow-lg"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-orange-400" />
                  
                  <div className="mb-6 pl-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <Navigation2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 leading-snug group-hover:text-primary transition-colors">{service}</h3>
                    <p className="text-xs text-muted-foreground">Premium Fleet Available</p>
                  </div>
                  
                  <Button 
                    onClick={() => handleServiceWhatsApp(service)}
                    className="w-full h-12 rounded-2xl text-sm font-semibold gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    Book via WhatsApp
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl border-white/5 max-w-xl mx-auto">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">No services matched your search</h3>
              <p className="text-slate-500 text-sm mb-6">If you need a custom route not listed, please reach out directly.</p>
              <Button asChild className="rounded-xl h-11 font-bold">
                <a href="https://wa.me/919172936138" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat Custom Route
                </a>
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
