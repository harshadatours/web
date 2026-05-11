"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TourCardProps {
  tour: {
    id: string
    title: string
    slug: string
    destination: string
    duration: string
    price: number
    rating: number
    image: string
    category: string
  }
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass rounded-[2rem] overflow-hidden group border-white/40 shadow-xl flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 glass px-4 py-1 rounded-full text-xs font-bold text-foreground">
          {tour.category}
        </div>
        <div className="absolute bottom-4 right-4 glass px-4 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-foreground">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {tour.rating}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-2">
          <MapPin className="w-3 h-3" />
          {tour.destination}
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-1">{tour.title}</h3>
        
        <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {tour.duration}
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-foreground/5">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-xl font-black text-foreground">₹{tour.price}</p>
          </div>
          <Button asChild size="sm" className="rounded-full px-6">
            <Link href={`/tours/${tour.slug}`}>
              Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
