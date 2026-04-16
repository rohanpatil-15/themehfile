import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export const dynamic = 'force-dynamic'; // Prevent static caching

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("MongoDB is not configured. Returning dummy orders array for testing.");
      return NextResponse.json({ success: true, orders: [] });
    }

    await connectToDatabase();
    
    // Fetch all orders sorted by newest first
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
