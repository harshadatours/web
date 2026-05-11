import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BLOGS = [
  {
    id: '1',
    title: 'Top 5 Weekend Gateways Near Pune',
    excerpt: 'Discover the best places to visit over the weekend to escape the city bustle...',
    date: 'May 10, 2024',
    author: 'Harshada Tours',
    image: '/mahabaleshwar.png',
    slug: 'top-weekend-gateways'
  },
  {
    id: '2',
    title: 'Why Renting a Car is Better than Public Transport',
    excerpt: 'Explore the freedom and flexibility that comes with your own private vehicle...',
    date: 'May 05, 2024',
    author: 'Admin',
    image: '/fortuner.png',
    slug: 'renting-vs-public-transport'
  },
  {
    id: '3',
    title: 'A Guide to Exploring the Konkan Coast',
    excerpt: 'Everything you need to know about the pristine beaches and forts of Konkan...',
    date: 'Apr 28, 2024',
    author: 'Travel Expert',
    image: '/konkan.png',
    slug: 'konkan-coast-guide'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Travel <span className="text-primary italic">Blog</span></h1>
          <p className="text-muted-foreground text-lg">Tips, guides, and inspiration for your next big adventure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOGS.map((blog) => (
            <div key={blog.id} className="glass rounded-[2.5rem] overflow-hidden border-white/20 flex flex-col group h-full">
              <div className="relative h-60 w-full overflow-hidden">
                <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-primary font-bold mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 leading-tight">{blog.title}</h2>
                <p className="text-muted-foreground mb-8 text-sm line-clamp-3">{blog.excerpt}</p>
                <Button asChild variant="ghost" className="mt-auto self-start p-0 h-auto hover:bg-transparent text-primary hover:translate-x-1 transition-transform">
                  <Link href={`/blog/${blog.slug}`}>
                    Read More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
