"use server"

import Razorpay from 'razorpay'
import { nanoid } from 'nanoid'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function createRazorpayOrder(amount: number) {
  try {
    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${nanoid(10)}`,
    }

    const order = await razorpay.orders.create(options)
    return { success: true, order }
  } catch (error) {
    console.error("Razorpay Error:", error)
    return { success: false, error: "Failed to create payment order" }
  }
}
