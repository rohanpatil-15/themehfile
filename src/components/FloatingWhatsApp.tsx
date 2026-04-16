"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/918407070741"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-400 transition-colors cursor-pointer group"
      whileHover={{ y: -5 }}
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-0 group-hover:animate-ping"></div>
    </motion.a>
  );
}
