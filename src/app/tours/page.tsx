import React from 'react'
import { TourCard } from '@/components/tours/tour-card'
import { Search, MapPin, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MOCK_TOURS = [
  {
    id: '1',
    title: 'Mahabaleshwar Weekend Gateway',
    slug: 'mahabaleshwar-weekend',
    destination: 'Mahabaleshwar',
    duration: '2 Days, 1 Night',
    price: 3500,
    rating: 4.8,
    image: '/mahabaleshwar.png',
    category: 'Hill Station'
  },
  {
    id: '2',
    title: 'Konkan Beach Paradise',
    slug: 'konkan-beach-paradise',
    destination: 'Konkan',
    duration: '3 Days, 2 Nights',
    price: 5999,
    rating: 4.9,
    image: '/konkan.png',
    category: 'Beach'
  },
  {
    id: '3',
    title: 'Spiritual Shirdi Tour',
    slug: 'shirdi-spiritual-tour',
    destination: 'Shirdi',
    duration: '1 Day',
    price: 1500,
    rating: 4.7,
    image: '/hero-bg.png', // Placeholder
    category: 'Spiritual'
  },
  {
    id: '4',
    title: 'Lonavala & Khandala Bliss',
    slug: 'lonavala-khandala-bliss',
    destination: 'Lonavala',
    duration: '2 Days, 1 Night',
    price: 2999,
    rating: 4.6,
    image: '/mahabaleshwar.png', // Placeholder
    category: 'Hill Station'
  }
]

export default function ToursPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Curated <span className="text-primary italic">Tour Packages</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explore the hidden gems of Maharashtra with our expert-led tour packages. Luxury, comfort, and memories guaranteed.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-2xl h-14 px-6 border-white/20">
               <SlidersHorizontal className="w-5 h-5 mr-2" />
               Filters
             </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="glass rounded-[2rem] p-4 mb-16 flex flex-wrap items-center gap-4 border-white/30">
          <div className="flex-1 min-w-[280px] relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by destination or package name..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary/50 transition-all outline-none"
            />
          </div>
          <div className="flex-1 min-w-[200px] relative">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
            <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:ring-2 focus:ring-primary/50 transition-all outline-none appearance-none">
              <option value="">All Destinations</option>
              <option value="konkan">Konkan</option>
              <option value="mahabaleshwar">Mahabaleshwar</option>
              <option value="shirdi">Shirdi</option>
            </select>
          </div>
          <Button className="h-14 px-10 rounded-2xl font-bold shadow-xl shadow-primary/20">
            Find Packages
          </Button>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {MOCK_TOURS.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  )
}
