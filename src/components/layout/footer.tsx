import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, MessageCircle, Camera, X, Play } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl p-1">
                <Image src="/logo.png" alt="Harshada Tours" width={48} height={48} className="object-contain w-full h-full" />
              </div>
              <span className="text-xl font-bold tracking-tight">Harshada <span className="text-primary italic">Tours</span></span>
            </Link>
            <p className="text-white/60 leading-relaxed font-light">
              Your trusted car rental partner in Pune. Specializing in luxury car rentals, outstation trips, and professional chauffeur services across Maharashtra.
            </p>
            <div className="flex gap-4">
              {[MessageCircle, Camera, X, Play].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Car Rental', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-4">
              {['Local Pune Rental', 'Outstation Cab', 'Airport Transfer', 'Luxury Bus Hire', 'Corporate Travel'].map((item) => (
                <li key={item}>
                  <span className="text-white/60 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white/60 text-sm">Viman Nagar, Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white/60 text-sm">+91 9172936138</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-white/60 text-sm">info@harshadatours.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2024 Harshada Tours and Travels. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
