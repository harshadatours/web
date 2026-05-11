"use client"

import React, { useState, useEffect } from 'react'
import { CarCard } from '@/components/cars/car-card'
import { Car } from '@/lib/types/cars'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false })
      
      if (data) {
        setCars(data as Car[])
        setFilteredCars(data as Car[])
      }
      setIsLoading(false)
    }
    fetchCars()
  }, [])

  useEffect(() => {
    let result = cars
    
    if (searchTerm) {
      result = result.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedType !== 'All') {
      result = result.filter(car => car.type === selectedType)
    }
    
    setFilteredCars(result)
  }, [searchTerm, selectedType, cars])

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Premium <span className="text-primary italic">Car Rentals</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Choose from our fleet of well-maintained vehicles for your next journey in and around Pune.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-16">
          <div className="glass rounded-[2rem] p-4 flex flex-wrap items-center gap-4 border-white/20 shadow-2xl">
            <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search by car name or brand..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 focus:ring-2 focus:ring-primary/50 transition-all outline-none text-white"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "h-14 px-8 rounded-2xl gap-2 border-white/10 hover:bg-white/5 transition-all",
                showFilters ? "bg-primary/20 border-primary/50 text-primary" : "text-white"
              )}
            >
              <Filter className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
            {searchTerm || selectedType !== 'All' ? (
               <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedType('All')
                }}
                className="h-14 px-6 rounded-2xl text-slate-400 hover:text-white"
               >
                 <X className="w-4 h-4 mr-2" />
                 Clear
               </Button>
            ) : null}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="glass rounded-[2rem] p-8 border-white/10 grid grid-cols-1 md:grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary">Vehicle Type</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all",
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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-[2.5rem] h-[500px] animate-pulse border-white/10" />
            ))}
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
            <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
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
