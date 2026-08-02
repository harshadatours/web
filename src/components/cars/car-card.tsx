"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, Fuel, Settings2, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Car } from '@/lib/types/cars'
import { getWhatsAppUrl, generateCarInquiryMessage } from '@/utils/whatsapp'

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const whatsappUrl = getWhatsAppUrl(
    '919172936138',
    generateCarInquiryMessage(car.name)
  )

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass rounded-3xl sm:rounded-[2.5rem] overflow-hidden group border-white/40 shadow-xl flex flex-col justify-between"
    >
      {/* Image Section */}
      <div className="relative h-52 sm:h-64 w-full overflow-hidden">
        <Image
          src={car.images[0] || '/placeholder-car.jpg'}
          alt={car.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3.5 right-3.5 glass px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary border-white/20">
          {car.type}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-8 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start mb-4 gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-0.5 leading-tight">{car.name}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm font-medium">{car.brand}</p>
            </div>
            <div className="flex gap-1 pt-1 shrink-0">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
              ))}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5">
            <div className="flex flex-col items-center justify-center text-center gap-1.5 p-2 sm:p-3 bg-primary/10 rounded-xl sm:rounded-2xl">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold leading-tight">{car.capacity || `${car.seats} Seats`}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-1.5 p-2 sm:p-3 bg-secondary/10 rounded-xl sm:rounded-2xl">
              <Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold leading-tight">{car.fuel_type}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-2 p-2 sm:p-3 bg-accent/10 rounded-xl sm:rounded-2xl">
              <Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold leading-tight capitalize">{car.transmission}</span>
            </div>
          </div>

          {/* Pricing & Rate Details */}
          {(car.price_per_km || car.per_day_running || car.toll_parking) && (
            <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-slate-400 font-medium">Rate / KM</span>
                <span className="font-extrabold text-primary text-sm sm:text-base">{car.price_per_km}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-400 text-[10px] sm:text-xs font-medium">Min Running</span>
                  <span className="font-semibold text-white text-xs">{car.per_day_running}/day</span>
                </div>
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-slate-400 text-[10px] sm:text-xs font-medium">Toll & Parking</span>
                  <span className="font-semibold text-amber-400 text-xs">{car.toll_parking}</span>
                </div>
              </div>
              {car.car_type && (
                <>
                  <div className="h-px bg-white/10" />
                  <div className="text-center text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                    ⚡ Options: {car.car_type}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 sm:gap-3">
          <Button
            asChild
            variant="default"
            className="flex-1 h-12 sm:h-14 rounded-2xl gap-2 font-bold text-sm bg-linear-to-r from-primary to-secondary hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Rent Now
            </a>
          </Button>
          <Button
            asChild
            variant="glass"
            size="icon"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shrink-0"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
