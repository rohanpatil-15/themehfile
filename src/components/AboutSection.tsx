"use client";

import { motion } from "framer-motion";
import { Star, Coffee, Headphones } from "lucide-react";

export default function AboutSection() {
  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-brand-base">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8 z-10"
          >
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-brand-gold uppercase mb-4">
                Our Story
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                More Than Just A Cafe, It's An <span className="text-brand-gold italic">Experience</span>
              </h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              Nestled in the heart of Jalgaon on MJ College Road, Mehfil The Cafe was born out of a simple passion: to create a space that feels like luxury, yet remains welcoming to everyone. Our carefully crafted blends, paired with a curated menu, provide the perfect escape.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you're here for a deep conversation, a solo work session, or to simply enjoy the best coffee in town, we promise an ambiance that makes you want to stay a little longer.
            </p>
            
            <div className="pt-4 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="Customer"
                    className="w-12 h-12 rounded-full border-2 border-brand-base object-cover"
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-brand-base bg-brand-gold flex items-center justify-center text-brand-base font-bold text-sm">
                  10k+
                </div>
              </div>
              <p className="text-sm text-gray-300">Happy Regulars</p>
            </div>
          </motion.div>

          {/* Image & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-brand-brown-dark/20 z-10 mix-blend-overlay group-hover:bg-transparent transition-all duration-700"></div>
            <img
              src="/2023-10-20 (2).webp"
              alt="Mehfil Cafe Ambience"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
            />
            
            {/* Badges */}
            <motion.div animate={floatAnimation} className="absolute top-10 -left-6 md:-left-12 glass px-6 py-3 rounded-2xl z-20 flex items-center gap-3">
              <div className="bg-yellow-400/20 p-2 rounded-full">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">4.9/5</p>
                <p className="text-gray-400 text-xs">Top Rated</p>
              </div>
            </motion.div>

            <motion.div animate={floatAnimation} transition={{ delay: 1, duration: 4, repeat: Infinity }} className="absolute bottom-20 -right-4 md:-right-8 glass px-6 py-3 rounded-2xl z-20 flex items-center gap-3">
              <div className="bg-brand-gold/20 p-2 rounded-full">
                <Coffee className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">Best Coffee</p>
                <p className="text-gray-400 text-xs">In Jalgaon</p>
              </div>
            </motion.div>

            <motion.div animate={floatAnimation} transition={{ delay: 2, duration: 4, repeat: Infinity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl z-20 flex items-center gap-3 w-48 justify-center">
              <Headphones className="w-5 h-5 text-gray-300" />
              <p className="text-white font-medium text-sm">Chill Music Vibes</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
