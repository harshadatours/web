"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { SERVICES, Service } from '@/lib/data'
import { Search, MessageCircle, Navigation2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { cn } from '@/lib/utils'

function ServiceCard({ service, handleServiceWhatsApp }: { service: Service, handleServiceWhatsApp: (name: string) => void }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0)

  return (
    <div className="glass rounded-3xl border-white/15 flex flex-col justify-between hover:scale-[1.03] hover:bg-white/5 transition-all duration-300 relative group overflow-hidden shadow-lg animate-in fade-in duration-300">
      {/* Top indicator line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-400 z-10" />
      
      {/* Service Image (if available) */}
      {service.images && service.images.length > 0 && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={service.images[activeImgIdx]} 
            alt={service.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          {service.images.length > 1 && (
            <span className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-[10px] font-bold text-white z-10 flex items-center gap-1 shadow-lg border-white/20">
              📸 {service.images.length} Photos
            </span>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div className="mb-6">
          {/* Show icon only if no cover image */}
          {(!service.images || service.images.length === 0) && (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <Navigation2 className="w-5 h-5" />
            </div>
          )}
          
          <h3 className="font-bold text-white text-lg mb-2 leading-snug group-hover:text-primary transition-colors">{service.name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {service.description || "Premium Fleet & Chauffeur Services Available"}
          </p>

          {/* Small image thumbnails for gallery if multiple images exist */}
          {service.images && service.images.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {service.images.map((img, imgIdx) => (
                <button 
                  key={imgIdx} 
                  onMouseEnter={() => setActiveImgIdx(imgIdx)}
                  onClick={() => setActiveImgIdx(imgIdx)}
                  className={cn(
                    "relative w-12 h-10 rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer",
                    activeImgIdx === imgIdx 
                      ? "border-primary scale-110 shadow-md shadow-primary/25 z-10" 
                      : "border-white/10 opacity-70 hover:opacity-100 hover:scale-105"
                  )}
                >
                  <Image src={img} alt={`${service.name} thumbnail`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => handleServiceWhatsApp(service.name)}
          className="w-full h-12 rounded-2xl text-sm font-semibold gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          Book via WhatsApp
        </Button>
      </div>
    </div>
  )
}

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredServices = searchTerm 
    ? SERVICES.filter(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : SERVICES;

  const sortedServices = [...filteredServices].sort((a, b) => {
    const aHasImages = a.images && a.images.length > 0 ? 1 : 0;
    const bHasImages = b.images && b.images.length > 0 ? 1 : 0;
    return bHasImages - aHasImages;
  });

  const handleServiceWhatsApp = (serviceName: string) => {
    const message = `Hello Harshada Tours and Travels,\n\nI would like to inquire about/book the service: *${serviceName}*.\n\nPlease provide me with details on rates, vehicle options, and availability.`
    const url = getWhatsAppUrl('919172936138', message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        
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
          {sortedServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedServices.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  service={service} 
                  handleServiceWhatsApp={handleServiceWhatsApp} 
                />
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
