import React from 'react'
import Image from 'next/image'
import { CheckCircle2, Award, Users, ShieldCheck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">Redefining <span className="text-primary italic">Car Rentals</span> in Pune</h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            Harshada Rentals is a premier car rental agency based in Viman Nagar, Pune. For over a decade, we have been providing high-quality vehicle rental services and professional chauffeur solutions to thousands of happy travelers.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src="/hero-bg.png" alt="Our Story" fill className="object-cover" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Our <span className="text-primary italic">Mission</span></h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Our mission is to provide safe, comfortable, and affordable travel solutions to our customers. We believe that every journey should be an experience to cherish, whether it&apos;s a short city commute or a long outstation trip.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {[
                { title: 'Quality Fleet', icon: ShieldCheck, desc: 'Well-maintained and clean vehicles for every trip.' },
                { title: 'Expert Drivers', icon: Users, desc: 'Professional, verified, and polite chauffeurs.' },
                { title: 'Customer First', icon: Award, desc: 'Dedicated 24/7 support for all your queries.' },
                { title: 'Best Pricing', icon: CheckCircle2, desc: 'Transparent and competitive rates without hidden costs.' }
              ].map((item, i) => (
                <div key={i} className="glass p-6 rounded-2xl border-white/20">
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Happy Customers', value: '10k+' },
              { label: 'Trips Completed', value: '15k+' },
              { label: 'Vehicles in Fleet', value: '50+' },
              { label: 'Years Experience', value: '12+' }
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-4xl md:text-6xl font-black text-primary mb-2 italic">{stat.value}</h3>
                <p className="text-white/60 font-medium uppercase tracking-widest text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
