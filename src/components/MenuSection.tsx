"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

type Category = "All" | "Sandwiches" | "Burgers" | "Soups" | "Rice" | "South Indian" | "Chinese" | "Noodles" | "Pizza" | "Fries" | "Beverages" | "Street Food";

const highlightItems = ["Veg Cheese Burger", "Paneer Chilli", "Cheese Loaded Pizza", "Cold Coffee", "Special Pav Bhaji"];

const generatedImages = {
  burger: "/generated/burger_gourmet_1776273013197.png",
  pizza: "/generated/pizza_gourmet_1776273029102.png",
  chinese: "/generated/chinese_gourmet_1776273044052.png",
  dosa: "/generated/dosa_gourmet_1776273058428.png",
  coffee: "/generated/coffee_gourmet_1776273071048.png"
};

function getImage(category: string, name: string) {
  if (category === "Burgers" || category === "Sandwiches" || category === "Fries") return generatedImages.burger;
  if (category === "Pizza") return generatedImages.pizza;
  if (category === "Chinese" || category === "Noodles" || category === "Soups" || category === "Rice") return generatedImages.chinese;
  if (category === "South Indian") return generatedImages.dosa;
  return generatedImages.coffee;
}

const menuItems = [
  // Sandwiches
  { name: "Cheese Chilli Sandwich", category: "Sandwiches", price: "₹100", desc: "Classic cheese with a spicy green chilli kick." },
  { name: "Veg Cheese Grilled Sandwich", category: "Sandwiches", price: "₹120", desc: "Red Chilli Sauce, Onion, Capsicum, Red Cabbage, Spices, Mayo, Cheese" },
  { name: "Tandoori Paneer Sandwich", category: "Sandwiches", price: "₹140", desc: "Tandoori paneer sandwich with tandoori sauce dip." },
  
  // Burgers
  { name: "Veg Burger", category: "Burgers", price: "₹80", desc: "Made with beans, chickpeas, lentils and fresh veggies." },
  { name: "Veg Cheese Burger", category: "Burgers", price: "₹100", desc: "Veg cheese burger is a kind of snack with loads of flavorful vegetables" },
  { name: "Corn Spinach Burger", category: "Burgers", price: "₹110", desc: "Delicious spinach corn patty along with capsicum, onion and cheese." },
  { name: "Double Tikki Cheese Burger", category: "Burgers", price: "₹130", desc: "Double patty goodness with extra cheese." },
  { name: "Peri Peri Burger", category: "Burgers", price: "₹120", desc: "Spicy Peri Peri coated patty." },

  // Soups
  { name: "Veg Clear Soup", category: "Soups", price: "₹90", desc: "A light and refreshing vegetable broth with assorted vegetables." },
  { name: "Sweet Corn Veg Soup", category: "Soups", price: "₹100", desc: "A clear soup containing healthy veggies and flavoured by sweet undertones." },
  { name: "Lemon Coriander Soup", category: "Soups", price: "₹100", desc: "Fresh lemon and aromatic coriander." },
  { name: "Hot and Sour Soup", category: "Soups", price: "₹110", desc: "The spicy and tangy flavours will take your taste buds on a ride." },
  { name: "Manchow Soup", category: "Soups", price: "₹120", desc: "The most popular Indo-Chinese spicy soup topped with crispy deep fried Noodles." },

  // Rice
  { name: "Fried Rice", category: "Rice", price: "₹130", desc: "Veggie-loaded rice stir-fried in soy sauce. Clean, simple and delicious." },
  { name: "Manchurian Rice", category: "Rice", price: "₹150", desc: "Manchurian-loaded rice stir-fried in sauces." },
  { name: "Schezwan Rice", category: "Rice", price: "₹140", desc: "A fiery favourite! Rice with veggies in our signature Schezwan sauce." },
  { name: "Singapuri Rice", category: "Rice", price: "₹160", desc: "Fried rice with Singaporean kick." },
  { name: "Triple Schezwan Rice", category: "Rice", price: "₹200", desc: "Healthy, delectable and super flavorsome rice loaded with vegetables." },
  { name: "Lemon Rice", category: "Rice", price: "₹130", desc: "Tangy and flavorful." },
  { name: "Paneer Rice", category: "Rice", price: "₹170", desc: "Rice tossed with fresh farm paneer." },
  { name: "Manchurian Schezwan Rice", category: "Rice", price: "₹180", desc: "Spicy schezwan meets manchurian flavors." },
  { name: "Paneer Schezwan Rice", category: "Rice", price: "₹190", desc: "Spicy schezwan sauce with soft paneer chunks." },

  // South Indian
  { name: "Masala Dosa", category: "South Indian", price: "₹100", desc: "Classic crispy dosa with potato filling." },
  { name: "Rawa Masala Dosa", category: "South Indian", price: "₹120", desc: "Crispy semolina dosa with spiced potatoes." },
  { name: "Mysore Masala Dosa", category: "South Indian", price: "₹130", desc: "Spicy red chutney spread inside." },
  { name: "Paper Masala Dosa", category: "South Indian", price: "₹140", desc: "Extra thin and crispy." },
  { name: "Cheese Paneer Dosa", category: "South Indian", price: "₹160", desc: "Loaded with cheese and grated paneer." },
  { name: "Pav Bhaji Dosa", category: "South Indian", price: "₹150", desc: "A fusion of Mumbai's street style pav bhaji." },
  { name: "Pizza Dosa", category: "South Indian", price: "₹180", desc: "Dosa meets Pizza toppings and cheese." },
  { name: "Mixed Uttapam", category: "South Indian", price: "₹110", desc: "Thick savory pancake with mixed veggies." },
  { name: "Cheese Uttapam", category: "South Indian", price: "₹140", desc: "Topped with melted cheese." },

  // Chinese
  { name: "Soyabean Chilli", category: "Chinese", price: "₹130", desc: "Soft soya bean tossed with bell peppers, onions, and spicy Indo-Chinese chilli." },
  { name: "Paneer Chilli", category: "Chinese", price: "₹180", desc: "Paneer lightly coated and fried, sauteed with garlic, spring onion, and chillies." },
  { name: "Veg Crispy", category: "Chinese", price: "₹150", desc: "Assorted vegetables fried crisp and tossed in sauces." },
  { name: "Paneer 65", category: "Chinese", price: "₹190", desc: "South-style spicy fried paneer bites with curry leaves." },
  { name: "Paneer Dragon", category: "Chinese", price: "₹200", desc: "Spicy paneer in fiery red sauce." },
  { name: "Paneer Manchurian", category: "Chinese", price: "₹180", desc: "Crispy paneer in classic manchurian sauce." },
  { name: "Chinese Bhel", category: "Chinese", price: "₹120", desc: "Crispy noodles tossed with schezwan and fresh veggies." },

  // Noodles
  { name: "Veg Hakka Noodle", category: "Noodles", price: "₹140", desc: "Classic stir-fried noodles." },
  { name: "Schezwan Noodle", category: "Noodles", price: "₹150", desc: "Fiery spicy noodles." },
  { name: "Paneer Noodle", category: "Noodles", price: "₹170", desc: "Noodles tossed with soft paneer chunks." },
  { name: "Hong Kong Noodle", category: "Noodles", price: "₹160", desc: "Sweet and spicy flavor profile." },
  { name: "Veg Triple Schezwan Noodle", category: "Noodles", price: "₹210", desc: "Noodles topped with rich schezwan gravy." },

  // Pizza
  { name: "Classic Veggie Pizza", category: "Pizza", price: "₹220", desc: "Onion, Capsicum, Tomato." },
  { name: "Cheese Loaded Pizza", category: "Pizza", price: "₹250", desc: "Four cheese blend baked to golden perfection with herbs." },
  { name: "Mushroom Delight Pizza", category: "Pizza", price: "₹260", desc: "Fresh button mushrooms and cheese." },
  { name: "Paneer Tikka Pizza", category: "Pizza", price: "₹280", desc: "Tandoori paneer bites on a cheesy base." },
  { name: "Spicy Chinese Pizza", category: "Pizza", price: "₹260", desc: "Schezwan sauce base with oriental toppings." },

  // Fries
  { name: "Salted Fries", category: "Fries", price: "₹90", desc: "Classic crispy potato fries." },
  { name: "Masala Fries", category: "Fries", price: "₹100", desc: "Tossed in Indian spices." },
  { name: "Cheese Fries", category: "Fries", price: "₹120", desc: "Topped with liquid cheese." },
  { name: "Peri Peri Fries", category: "Fries", price: "₹110", desc: "Spicy peri peri seasoning." },

  // Beverages
  { name: "Cold Coffee", category: "Beverages", price: "₹120", desc: "A refreshing beverage made with the perfect balance of creamy and rich coffee." },

  // Street Food
  { name: "Special Pav Bhaji", category: "Street Food", price: "₹140", desc: "Special Pav Bhaji served with 2 buttery pavs." },
  { name: "Cheese Pav Bhaji", category: "Street Food", price: "₹160", desc: "Rich pav bhaji topped with grated cheese." },
  { name: "Masala Pav", category: "Street Food", price: "₹80", desc: "Pav tossed in signature bhaji masala." },
  { name: "Chole Kulcha", category: "Street Food", price: "₹150", desc: "Amritsari Chole with 2 Pieces Kulcha." },
].map(item => ({ ...item, image: getImage(item.category, item.name) }));


export default function MenuSection() {
  const { addItem } = useCartStore();
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories: Category[] = ["All", "Sandwiches", "Burgers", "Soups", "Rice", "South Indian", "Chinese", "Noodles", "Pizza", "Fries", "Beverages", "Street Food"];

  const filteredMenu = activeTab === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  const visibleItems = showAll ? filteredMenu : filteredMenu.slice(0, 8);

  const handleTabSwitch = (tab: Category) => {
    setActiveTab(tab);
    setShowAll(false);
  }

  return (
    <section id="menu" className="py-24 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4">Our Menu</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">A Taste of <span className="italic text-brand-gold">Perfection</span></h3>
          <p className="text-gray-400">Discover our massive selection of over 50+ handcrafted items, from street food favorites to premium cafe delights.</p>
        </div>

        <div className="flex overflow-x-auto justify-start md:justify-center gap-3 mb-12 pb-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabSwitch(tab)}
              className={`snap-center shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                activeTab === tab ? "text-brand-base" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-brand-gold rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{tab}</span>
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {visibleItems.map((item, index) => {
              const isHighlight = highlightItems.includes(item.name);
              return (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: (index % 12) * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl overflow-hidden ${isHighlight ? 'bg-gradient-to-br from-brand-brown-dark to-brand-base border border-brand-gold/20' : 'bg-[#111]'} flex flex-col hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-shadow duration-500`}
                >
                  <div className="aspect-[4/3] w-full bg-gray-900 overflow-hidden relative border-b border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    {isHighlight && (
                      <div className="absolute top-3 left-3 bg-brand-gold text-brand-base text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Must Try
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <button 
                        onClick={() => addItem({ name: item.name, price: item.price, category: item.category, image: item.image })}
                        className="px-6 py-2 border-2 border-brand-gold bg-brand-base/80 backdrop-blur-sm rounded-full text-brand-gold font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-gold hover:text-brand-base"
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-serif text-white font-bold leading-tight group-hover:text-brand-gold transition-colors">{item.name}</h4>
                        <span className="text-brand-gold font-bold font-serif ml-4 shrink-0 text-lg">{item.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow line-clamp-2">{item.desc}</p>
                    
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs uppercase tracking-widest text-gray-500">{item.category}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredMenu.length > 8 && (
          <motion.div layout className="mt-16 flex justify-center">
             <button 
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-full border-2 border-brand-gold text-brand-gold font-bold hover:bg-brand-gold hover:text-brand-base transition-all duration-300 transform hover:scale-105"
             >
                {showAll ? "Show Less" : "View Full Menu"}
             </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
