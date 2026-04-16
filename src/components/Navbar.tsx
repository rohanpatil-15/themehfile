"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee, ShoppingBag } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, setIsOpen } = useCartStore();
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-transparent py-6"
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="https://yeybeegdfejcniqhwbbd.supabase.co/storage/v1/object/sign/CAFE%20MEHFILE/361632236_675768737751341_8344602149402290112_n-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lMWU1Nzc2Ny1lYmM0LTQ0MzgtYTE5Ny1hZTcyMTIxNGEzZGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDQUZFIE1FSEZJTEUvMzYxNjMyMjM2XzY3NTc2ODczNzc1MTM0MV84MzQ0NjAyMTQ5NDAyMjkwMTEyX24tcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NzYyNjg1MTEsImV4cCI6MTg2MjU4MjExMX0.7rXp08RRyGHWB2C6_DdLBc3i1IOhYokXv9qrHb3g_nE" 
              alt="Mehfil The Cafe Logo" 
              className="w-24 h-24 object-contain transition-transform group-hover:scale-110 duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6 items-center">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-300 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-gray-300 hover:text-brand-gold transition-colors group"
              >
                <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-brand-gold text-brand-base text-[11px] font-bold flex items-center justify-center animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.6)]">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-2 rounded-full glass-gold text-brand-gold font-medium hover:bg-brand-gold hover:text-brand-base transition-all duration-300 transform hover:scale-105"
              >
                Checkout
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle & Cart */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-white hover:text-brand-gold transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-brand-gold text-brand-base text-[10px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-base pt-24 px-6 md:hidden flex flex-col"
          >
            <ul className="flex flex-col gap-6 text-center mt-10">
              {navLinks.map((link) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif text-gray-300 hover:text-brand-gold"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto mb-10 mx-auto w-full max-w-xs">
              <Link
                href="#menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-6 py-4 rounded-full bg-brand-gold text-brand-base font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Order Online
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
