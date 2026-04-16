import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = await req.json();

    // If keys are missing, we bypass signature verification for the sake of MVP local testing
    if (process.env.RAZORPAY_KEY_SECRET) {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      const isAuthentic = expectedSignature === razorpay_signature;

      if (!isAuthentic) {
        return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 });
      }
    }

    // Payment is verified or we're in mock mode. Let's save to MongoDB.
    await connectToDatabase();

    const newOrder = new Order({
      customerName: orderDetails.customerName,
      customerPhone: orderDetails.customerPhone,
      address: orderDetails.address,
      items: orderDetails.items,
      totalAmount: orderDetails.totalAmount,
      paymentStatus: "Paid",
      orderStatus: "New",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    await newOrder.save();

    return NextResponse.json({ success: true, orderId: newOrder._id });
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json({ success: false, error: "Failed to verify and save order" }, { status: 500 });
  }
}
