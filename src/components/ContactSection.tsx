"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, ShoppingBag } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 bg-brand-base overflow-hidden">
      {/* Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-base/80 z-10 backdrop-blur-sm"></div>
        <img
          src="/unnamed.png"
          alt="Background"
          className="w-full h-full object-cover blur-sm"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* CTA & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-5xl md:text-6xl font-serif text-white font-bold mb-6">
              Ready to <span className="text-brand-gold italic">experience</span> Mehfil?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-lg">
              Visit us for an unforgettable cafe experience. We're open every day, serving the best coffee and food in Jalgaon.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-lg">Address</h4>
                  <p className="text-gray-400">Shanti Arcade, MJ College Rd, Jalgaon, Maharashtra</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-brand-gold flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Timing</h4>
                  <p className="text-gray-400">Monday - Sunday: 10:00 AM – 10:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:08407070741"
                className="flex-1 py-4 px-6 rounded-full bg-brand-gold text-brand-base font-bold text-center flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] group"
              >
                <Phone className="w-5 h-5 group-hover:animate-bounce" />
                Call Now
              </a>
              <a
                href="https://maps.google.com/?q=Mehfil+The+Cafe+Jalgaon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 px-6 rounded-full glass text-white font-bold text-center flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Directions
              </a>
              <a
                href="#menu"
                className="flex-1 py-4 px-6 rounded-full glass-gold text-brand-gold font-bold text-center flex items-center justify-center gap-2 hover:bg-brand-gold/10 transition-colors group relative overflow-hidden"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Online
                {/* Pulse animation overlay */}
                <div className="absolute inset-0 rounded-full border-2 border-brand-gold/50 animate-ping opacity-50"></div>
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 p-2 glass"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2952402120027!2d75.556!3d21.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90fb4!2sMJ%20College%20Rd%2C%20Jalgaon!5e0!3m2!1sen!2sin!4v1714567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
