"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, Clock, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createRazorpayOrder } from '@/actions/razorpay'
import { toast } from 'sonner'
import Script from 'next/script'

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

  const handleBooking = async () => {
    setLoading(true)
    try {
      const res = await createRazorpayOrder(tour.price)
      
      if (!res.success || !res.order) {
        toast.error("Failed to initialize payment")
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: res.order.amount,
        currency: res.order.currency,
        name: "Harshada Tours",
        description: `Booking for ${tour.title}`,
        order_id: res.order.id,
        handler: function (response: any) {
          toast.success("Payment Successful! Booking Confirmed.")
          console.log(response)
          // Here you would typically call a server action to save the booking to Supabase
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#FF9933",
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (error) {
      toast.error("An error occurred during booking")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
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
                  <div className="mb-8">
                    <p className="text-muted-foreground mb-1">Total Price</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-foreground">₹{tour.price}</span>
                      <span className="text-muted-foreground mb-1">/ person</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium">Select Date</span>
                      </div>
                      <span className="text-sm font-bold">Check Availability</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-medium">Travelers</span>
                      </div>
                      <span className="text-sm font-bold">1 Adult</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 gap-3"
                  >
                    {loading ? "Processing..." : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Book & Pay with Razorpay
                      </>
                    )}
                  </Button>

                  <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                      Secure payment via Razorpay
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Instant confirmation
                    </div>
                  </div>
                </div>
                
                {/* Support Card */}
                <div className="mt-6 glass p-6 rounded-[2rem] border-white/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
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
    </>
  )
}
