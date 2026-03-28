import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingCart, Star, Clock, Flame, Loader2 } from 'lucide-react';
import Hero from '../components/Hero';
import API_URL from '../config';

const categories = ['All', 'Appetizer', 'Main Course', 'Dessert'];


const badgeColors = {
  "Chef's Pick": 'bg-manara-gold text-manara-dark',
  'Popular': 'bg-blue-500 text-white',
  'Bestseller': 'bg-orange-500 text-white',
  'Signature': 'bg-rose-500 text-white',
};

const RestaurantPage = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API_URL}/menu`);

        const data = await res.json();
        
        // Filter and Map
        const restaurantMenu = data
          .filter(item => item.category === 'Restaurant')
          .map(item => ({
            ...item,
            id: item._id,
            image: item.imageUrl,
            desc: item.description,
            badge: ["Chef's Pick", "Popular", "Bestseller", "Signature"][Math.floor(Math.random() * 4)],
            time: '25 min',
            rating: (4.7 + Math.random() * 0.3).toFixed(1),
            category: item.type // Use database type for UI category filtering
          }));

          
        setMenuItems(restaurantMenu);
      } catch (err) {
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filtered = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(i => i.category === activeCategory);

  const handleAdd = (item) => {
    addToCart(item, 'Restaurant');
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="bg-[#fbfcfd]">
      <Hero
        title="Fine Dining"
        subtitle="A Culinary Journey"
        bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-manara-gold font-black uppercase tracking-[0.3em] text-sm mb-4 block">Our Gourmet Menu</span>
          <h2 className="text-4xl md:text-6xl font-black text-manara-dark mb-4">World Class Cuisine</h2>
          <p className="text-gray-400 font-medium text-xl max-w-xl mx-auto">Every dish is crafted with the finest ingredients by our master chefs.</p>
          <div className="w-24 h-1.5 bg-manara-gold mx-auto rounded-full mt-6" />
        </div>



        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-manara-dark text-manara-gold shadow-xl shadow-manara-dark/20'
                  : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-manara-gold/30 hover:text-manara-dark shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-manara-gold animate-spin mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Gourmet Menu...</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Badge */}
                    <div className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${badgeColors[item.badge]}`}>
                      {item.badge}
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-5 right-5 bg-white/15 backdrop-blur-md border border-white/20 text-white font-black text-lg px-4 py-2 rounded-2xl">
                      ${item.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-black text-manara-gold uppercase tracking-[0.2em]">{item.category}</span>
                        <h3 className="text-2xl font-black text-manara-dark mt-0.5">{item.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl ring-1 ring-amber-100 flex-shrink-0 ml-2">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-black text-amber-600">{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 font-medium text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold">{item.time}</span>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAdd(item)}
                        className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg ${
                          addedId === item.id
                            ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                            : 'bg-manara-dark text-manara-gold hover:bg-manara-gold hover:text-manara-dark shadow-manara-dark/20'
                        }`}
                      >
                        {addedId === item.id ? (
                          <><ShoppingCart className="w-4 h-4" /> Added!</>
                        ) : (
                          <><Plus className="w-4 h-4" /> Order</>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
