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
      whileHover={{ y: -10 }}
      className="glass rounded-[2.5rem] overflow-hidden group border-white/40 shadow-xl"
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={car.images[0] || '/placeholder-car.jpg'}
          alt={car.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 glass px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-primary">
          {car.type}
        </div>
        <div className="absolute bottom-4 left-4 glass px-4 py-1 rounded-full text-lg font-bold text-foreground">
          ₹{car.price_per_day}<span className="text-xs font-normal text-muted-foreground">/day</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">{car.name}</h3>
            <p className="text-muted-foreground text-sm">{car.brand}</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="w-2 h-2 rounded-full bg-primary" />
            ))}
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center gap-2 p-3 bg-primary/5 rounded-2xl">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium">{car.seats} Seats</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-secondary/5 rounded-2xl">
            <Fuel className="w-5 h-5 text-secondary" />
            <span className="text-xs font-medium">{car.fuel_type}</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 bg-accent/5 rounded-2xl">
            <Settings2 className="w-5 h-5 text-accent" />
            <span className="text-xs font-medium capitalize">{car.transmission}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            asChild
            variant="default"
            className="flex-1 h-14 rounded-2xl gap-2 font-bold bg-linear-to-r from-primary to-secondary hover:scale-[1.02] transition-transform"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              Rent Now
            </a>
          </Button>
          <Button
            variant="glass"
            size="icon"
            className="w-14 h-14 rounded-2xl"
          >
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
