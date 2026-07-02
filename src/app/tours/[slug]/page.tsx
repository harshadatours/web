import React from 'react'
import { notFound } from 'next/navigation'
import TourDetail from '@/components/tours/tour-detail'
import { TOURS } from '@/lib/data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function TourPage({ params }: PageProps) {
  const resolvedParams = await params
  const tour = TOURS.find((t) => t.slug === resolvedParams.slug)

  if (!tour) {
    notFound()
  }

  // Map to the format TourDetail expects (images array)
  const tourWithImages = {
    ...tour,
    images: [tour.image]
  }

  return <TourDetail tour={tourWithImages} />
}
