"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Coffee } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-brand-base/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-base via-brand-base/20 to-transparent z-10"></div>
        {/* Placeholder for premium coffee image */}
        <img
          src="/unnamed (1).webp"
          alt="Cafe Interior"
          className="w-full h-[120%] object-cover object-center -top-[10%]"
        />
      </motion.div>

      {/* Floating Particles (Simple CSS) */}
      {mounted && (
        <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-gold rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random(),
              }}
              animate={{
                y: [null, Math.random() * -200],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
            Where Coffee Meets <span className="text-brand-gold italic">Conversations</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
            Jalgaon’s Favorite Hangout Spot.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-gold text-brand-base font-bold text-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Coffee className="w-5 h-5" />
            View Menu
          </Link>
          <Link
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass text-white font-medium text-lg hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5 text-brand-gold" />
            Get Directions
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-brand-gold">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-6 h-6 text-brand-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
