import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  category: string;
  quantity: number;
}

export interface IOrder extends Document {
  customerName: string;
  customerPhone: string;
  address: string;
  items: IOrderItem[];
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: "New" | "Preparing" | "Completed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  numericPrice: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    address: { type: String, required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["New", "Preparing", "Completed"],
      default: "New",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
  },
  {
    timestamps: true,
  }
);

// To avoid recompiling the model in serverless environments
const Order: Model<IOrder> = mongoose.models?.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
