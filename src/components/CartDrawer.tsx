"use client";

import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeItem, cartTotal } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] bg-[#0a0a0a] border-l border-white/5 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#111]">
                <h2 className="text-xl font-serif text-brand-gold flex items-center gap-2">
                  <ShoppingBag size={20} /> Your Order
                </h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-[#111] p-3 rounded-xl border border-white/5">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-900 border border-white/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-bold leading-tight">{item.name}</h4>
                          <span className="text-brand-gold text-sm font-bold">{item.price}</span>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="text-white text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-gold transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500 self-start p-1 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-5 bg-[#111] border-t border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Total</span>
                    <span className="text-2xl text-white font-bold font-serif">₹{cartTotal()}</span>
                  </div>
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full py-4 bg-brand-gold text-brand-base font-bold rounded-full flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors"
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
}
