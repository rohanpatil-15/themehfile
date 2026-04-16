"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Aaditya Patil",
    role: "Local Guide",
    rating: 5,
    text: "Absolutely stunning vibe. The interiors are premium, and the coffee is the best in Jalgaon. Perfect place to hang out with friends or even work.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Sneha Deshmukh",
    role: "Regular Customer",
    rating: 5,
    text: "The Veg Cheese Burger is highly recommended! The staff is courteous and the service is quick. This feels like a luxury cafe you'd find in Mumbai or Pune.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Rohan Kulkarni",
    role: "Food Blogger",
    rating: 4,
    text: "Great taste and amazing ambiance! They get really busy on weekends, so sometimes getting a table can take a few minutes, but definitely worth the wait.",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    name: "Pooja Wani",
    role: "Student",
    rating: 5,
    text: "My favorite spot near MJ College. Best Cold Coffee and the music they play is always so chill. A must-visit and totally value for money.",
    avatar: "https://i.pravatar.cc/150?img=43",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 relative bg-brand-base overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">What Our <span className="italic text-brand-gold">Guests Say</span></h3>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-hide py-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[320px] md:min-w-[400px] snap-center shrink-0 glass p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-gold/10" />
              
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.1 + 0.3 }}
                  >
                    <Star
                      className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-300 text-lg italic mb-8 relative z-10 line-clamp-4">
                &quot;{review.text}&quot;
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border border-brand-gold/30" />
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-brand-gold text-sm">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
