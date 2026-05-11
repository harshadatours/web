export interface Car {
  id: string
  name: string
  slug: string
  brand: string
  type: 'SUV' | 'Sedan' | 'Hatchback' | 'Luxury' | 'Bus'
  transmission: 'Manual' | 'Automatic'
  fuel_type: 'Petrol' | 'Diesel' | 'EV' | 'CNG'
  seats: number
  price_per_day: number
  images: string[]
  features: string[]
  description: string
  is_available: boolean
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      cars: {
        Row: Car
        Insert: Omit<Car, 'id' | 'created_at'>
        Update: Partial<Omit<Car, 'id' | 'created_at'>>
      }
      // ... previous tables
    }
  }
}
