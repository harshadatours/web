"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, Clock, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWhatsAppUrl } from '@/utils/whatsapp'
import { toast } from 'sonner'

interface TourDetailProps {
  tour: {
    id: string
    title: string
    description: string
    price: number
    duration: string
    itinerary: { day: number, title: string, content: string }[]
    images: string[]
    included: string[]
  }
}

export default function TourDetail({ tour }: TourDetailProps) {
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [travelers, setTravelers] = useState(1)

  const handleBooking = () => {
    setLoading(true)
    try {
      const message = `Hello Harshada Tours and Travels,\n\nI am interested in booking the *${tour.title}* package.\n\n*Details:*\n- Duration: ${tour.duration}\n- Travelers: ${travelers}\n${selectedDate ? `- Planned Date: ${selectedDate}\n` : ''}\nPlease let me know the availability and how to proceed.`
      const whatsappUrl = getWhatsAppUrl('919172936138', message)
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      toast.success("Redirecting to WhatsApp...")
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Multiple Locations
                </div>
              </div>
            </motion.div>

            {/* Main Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
              <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" />
            </div>

            {/* Itinerary */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8">Travel <span className="text-primary italic">Itinerary</span></h2>
              <div className="space-y-6">
                {tour.itinerary.map((item) => (
                  <div key={item.day} className="glass p-8 rounded-3xl border-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                    <div className="flex items-start gap-6">
                      <div className="bg-primary/10 text-primary font-bold w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                        {item.day}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Day {item.day}: {item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="glass p-8 rounded-[2.5rem] border-white/40 shadow-2xl">
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-bold">Book This Tour</h3>
                  <p className="text-muted-foreground text-sm">Send us a message to check availability.</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-1">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-medium text-sm">Travel Date</span>
                    </div>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-transparent border-none text-white text-sm outline-none w-full [color-scheme:dark]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-4 bg-white/5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-1">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-medium text-sm">Number of Travelers</span>
                    </div>
                    <input 
                      type="number" 
                      min="1"
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                      className="bg-transparent border-none text-white text-sm outline-none w-full"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inquire on WhatsApp
                </Button>

                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    Verified Local Travel Operator
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Customizable itineraries
                  </div>
                </div>
              </div>
              
              {/* Support Card */}
              <div className="mt-6 glass p-6 rounded-[2rem] border-white/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  ?
                </div>
                <div>
                  <p className="font-bold">Need Help?</p>
                  <p className="text-sm text-muted-foreground">Call us: +91 9172936138</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
