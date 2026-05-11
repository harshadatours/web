import React from 'react'
import { notFound } from 'next/navigation'
import TourDetail from '@/components/tours/tour-detail'

const MOCK_TOURS = [
  {
    id: 'mahabaleshwar-weekend',
    title: 'Mahabaleshwar Weekend Gateway',
    slug: 'mahabaleshwar-weekend',
    description: 'Experience the magic of Mahabaleshwar with our specially curated weekend package. From the panoramic views of Arthur Seat to the sweet taste of Mapro Garden strawberries, this tour covers the best of the hill station.',
    price: 3500,
    duration: '2 Days, 1 Night',
    images: ['/mahabaleshwar.png'],
    included: ['Transportation', 'Hotel Stay', 'Sightseeing', 'Breakfast'],
    itinerary: [
      { day: 1, title: 'Arrival & Local Sightseeing', content: 'Arrive at Mahabaleshwar, check-in to your hotel. Visit Venna Lake, Old Mahabaleshwar Temple, and Arthur Seat.' },
      { day: 2, title: 'Panchgani & Departure', content: 'Morning visit to Mapro Garden and Table Land in Panchgani. Late afternoon departure back to Pune.' }
    ]
  },
  {
    id: 'konkan-beach-paradise',
    title: 'Konkan Beach Paradise',
    slug: 'konkan-beach-paradise',
    description: 'Discover the pristine beaches and delicious seafood of Konkan. This tour takes you to the most serene coastal spots where the greenery meets the Arabian Sea.',
    price: 5999,
    duration: '3 Days, 2 Nights',
    images: ['/konkan.png'],
    included: ['AC Transportation', 'Beachfront Resort', 'Sightseeing', 'Dinner'],
    itinerary: [
      { day: 1, title: 'Coastal Arrival', content: 'Travel to Konkan via the scenic Tamhini Ghat. Relax at the beach in the evening.' },
      { day: 2, title: 'Water Sports & Forts', content: 'Visit Janjira Fort and enjoy water sports at the local beach.' },
      { day: 3, title: 'Temple Visit & Return', content: 'Visit Ganpatipule Temple and head back to Pune with sweet memories.' }
    ]
  }
]

export default function TourPage({ params }: { params: { slug: string } }) {
  const tour = MOCK_TOURS.find((t) => t.slug === params.slug)

  if (!tour) {
    notFound()
  }

  return <TourDetail tour={tour} />
}
