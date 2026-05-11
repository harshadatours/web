export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
        }
      }
      tours: {
        Row: {
          id: string
          title: string
          slug: string
          destination: string
          description: string
          itinerary: Json
          duration: string
          price: number
          images: string[]
          category: string
          featured: boolean
          type: 'tour' | 'car'
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          destination: string
          description: string
          itinerary: Json
          duration: string
          price: number
          images: string[]
          category: string
          featured?: boolean
          type?: 'tour' | 'car'
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          destination?: string
          description?: string
          itinerary?: Json
          duration?: string
          price?: number
          images?: string[]
          category?: string
          featured?: boolean
          type?: 'tour' | 'car'
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          booking_id: string
          user_id: string
          tour_id: string
          travelers: number
          total_price: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          travel_date: string
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          user_id: string
          tour_id: string
          travelers: number
          total_price: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          travel_date: string
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          user_id?: string
          tour_id?: string
          travelers?: number
          total_price?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          travel_date?: string
          created_at?: string
        }
      }
    }
  }
}
