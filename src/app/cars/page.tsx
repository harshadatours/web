"use client"

import React, { useState, useEffect } from 'react'
import { CarCard } from '@/components/cars/car-card'
import { Car } from '@/lib/types/cars'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CARS } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function CarsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredCars = CARS.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || car.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 md:mb-4 text-white">
            Premium <span className="text-primary italic">Car Rentals</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
            Choose from our fleet of well-maintained vehicles for your next journey in and around Pune.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-10 md:mb-16">
          <div className="glass rounded-3xl md:rounded-[2rem] p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 border-white/20 shadow-2xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by car name or brand..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-12 sm:pl-14 pr-4 focus:ring-2 focus:ring-primary/50 transition-all outline-none text-white text-sm sm:text-base placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex-1 sm:flex-initial h-12 sm:h-14 px-5 sm:px-8 rounded-2xl gap-2 border-white/10 hover:bg-white/5 transition-all text-sm font-semibold",
                  showFilters ? "bg-primary/20 border-primary/50 text-primary" : "text-white"
                )}
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                {showFilters ? 'Hide Filters' : 'Filters'}
              </Button>
              {searchTerm || selectedType !== 'All' ? (
                 <Button 
                  variant="ghost" 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedType('All')
                  }}
                  className="h-12 sm:h-14 px-4 sm:px-6 rounded-2xl text-slate-400 hover:text-white text-sm"
                 >
                   <X className="w-4 h-4 mr-1.5" />
                   Clear
                 </Button>
              ) : null}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="glass rounded-3xl md:rounded-[2rem] p-5 sm:p-8 border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Vehicle Type</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'SUV', 'Sedan', 'Luxury', 'Bus'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer",
                        selectedType === type 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 glass rounded-[3rem] border-white/5">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No cars match your search</h3>
            <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your filters or search terms to find what you&apos;re looking for.</p>
            <Button 
              variant="outline" 
              className="mt-8 rounded-2xl h-12"
              onClick={() => {
                setSearchTerm('')
                setSelectedType('All')
              }}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
