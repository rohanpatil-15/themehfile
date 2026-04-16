"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { cartTotal, items, clearCart, setIsOpen } = useCartStore();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      // Create order on backend
      const orderData = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal() })
      }).then(t => t.json());

      if (!orderData || !orderData.id) {
        alert("Failed to initiate order. Please try again.");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourKeyId", 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Mehfil The Cafe",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/orders/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  customerName: formData.name,
                  customerPhone: formData.phone,
                  address: formData.address,
                  items,
                  totalAmount: cartTotal(),
                }
              })
            }).then(t => t.json());

            if (verifyRes.success) {
              alert("Payment Successful! Your order has been placed.");
              clearCart();
              setIsOpen(false);
              onClose();
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verfication encountered an error.");
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: "#D4AF37", // brand-gold
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
           <X size={20} />
        </button>

        <h3 className="text-2xl font-serif text-brand-gold mb-6">Complete Your Order</h3>

        <form onSubmit={handlePayment} className="flex flex-col gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
             <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition" placeholder="John Doe" />
           </div>
           
           <div>
             <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
             <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition" placeholder="+91 9876543210" />
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-400 mb-1">Table No or Address</label>
             <textarea required name="address" value={formData.address} onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition" placeholder="Table 4 OR Home delivery detailed address..." rows={3} />
           </div>

           <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-gray-400">Total Amount</span>
              <span className="text-2xl font-serif font-bold text-white">₹{cartTotal()}</span>
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full mt-4 py-4 bg-brand-gold text-brand-base font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50"
           >
             {loading ? <Loader2 className="animate-spin" size={20} /> : "Pay Now securely"}
           </button>
        </form>
      </motion.div>
    </div>
  );
}
