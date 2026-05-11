"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signup } from '@/actions/auth'
import { toast } from 'sonner'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await signup(formData)
    
    if (result?.error) {
      toast.error(result.error)
      setIsLoading(false)
    } else if (result?.success) {
      setIsSuccess(true)
      toast.success(result.success)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0 bg-slate-950" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 glass rounded-[3rem] p-12 text-center max-w-md border-white/20"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Check your email</h2>
          <p className="text-white/60 mb-8">
            We've sent a verification link to your email address. Please confirm your account to continue.
          </p>
          <Button asChild className="rounded-2xl h-14 w-full">
            <Link href="/login">Back to Login</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Signup Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass rounded-[3rem] p-8 md:p-12 border-white/20 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/60">Join Harshada Tours for exclusive benefits</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-white/60">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
