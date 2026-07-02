"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQS = [
  {
    question: "What types of cars do you have for rent?",
    answer: "We offer a curated fleet of well-maintained vehicles including New Dizire 4+1, New Ertiga 6+1, Innova Crysta 6+1, Scorpio 11 (7+1), Tampo Travel 17 seater, and Tampo Travel 32 seater."
  },
  {
    question: "Do you provide drivers with car rentals?",
    answer: "Yes, we specialize in chauffeur-driven car rentals. Our drivers are highly experienced, professional, and familiar with both local and outstation routes."
  },
  {
    question: "How do I book a tour package or car?",
    answer: "You can browse our tour packages and cars on the website, select your preferred travel date, and request a booking instantly. You will be redirected to WhatsApp where our team will confirm your booking and details."
  },
  {
    question: "Are your prices inclusive of fuel and tolls?",
    answer: "For local rentals, pricing is usually based on kilometers and hours. For outstation trips, fuel and driver allowance are included, while toll and parking charges are as per actuals."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 24 hours prior to the trip are eligible for a full refund. For late cancellations, a small convenience fee may apply."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Frequently Asked <span className="text-primary italic">Questions</span></h1>
            <p className="text-muted-foreground text-lg">Everything you need to know about our services and booking process.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass rounded-3xl border-white/20 overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-white/5 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
