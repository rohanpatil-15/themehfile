import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    // Check if keys are provided, fallback to dummy handle if absent
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
       console.error("DEBUG: Razorpay keys ARE MISSING from process.env");
       return NextResponse.json({ error: "Configuration missing" }, { status: 500 });
    }

    console.log("DEBUG: Razorpay Key ID present, length:", process.env.RAZORPAY_KEY_ID.length);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID.trim(),
      key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
    });

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `rcpt_${crypto.randomBytes(4).toString('hex')}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay create order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
