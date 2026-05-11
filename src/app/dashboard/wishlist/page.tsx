"use client"

import React from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My <span className="text-primary italic">Wishlist</span></h1>
        <p className="text-muted-foreground">Save the cars you love and book them later.</p>
      </div>

      <div className="glass p-20 rounded-[3rem] border-white/10 text-center space-y-6">
        <div className="w-24 h-24 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-bold">Your wishlist is empty</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">Click the heart icon on any car card to add it to your wishlist.</p>
        <Button asChild size="lg" className="rounded-2xl h-14 px-10">
          <Link href="/cars">Explore Cars</Link>
        </Button>
      </div>
    </div>
  )
}
