"use client";

import { motion } from "framer-motion";

const galleryItems = [
  { url: "/unnamed (2).webp", title: "Signature Flavors", span: "md:col-span-2 md:row-span-2" },
  { url: "/unnamed (3).webp", title: "Cafe Vibes", span: "md:col-span-1 md:row-span-1" },
  { url: "/unnamed (4).webp", title: "Pizza Evenings", span: "md:col-span-1 md:row-span-2" },
  { url: "/unnamed.jpg", title: "Refreshing Sips", span: "md:col-span-1 md:row-span-1" },
  { url: "/unnamed.webp", title: "Sweet Moments", span: "md:col-span-1 md:row-span-1" },
  { url: "/2023-10-20.webp", title: "Cozy Corners", span: "md:col-span-2 md:row-span-1" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-brand-base relative overflow-hidden">
      {/* Background typography accent */}
      <h2 className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[15vw] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none tracking-tighter mix-blend-color-dodge z-0">
        GALLERY
      </h2>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            Gallery
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-white mb-6"
          >
            Moments at <span className="italic text-brand-gold">Mehfil</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden shadow-2xl ${item.span}`}
            >
              {/* Blur placeholder before hover / deep background */}
              <div className="absolute inset-0 bg-brand-brown-dark/30 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
              
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out brightness-75 group-hover:brightness-100"
              />

              {/* Luxury Frame Overlay */}
              <div className="absolute inset-0 border border-white/10 rounded-3xl m-3 pointer-events-none z-20 group-hover:border-brand-gold/40 transition-colors duration-700"></div>

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30">
                <span className="text-white font-serif text-2xl font-bold">{item.title}</span>
                <span className="text-brand-gold text-sm tracking-widest uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  Discover
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
