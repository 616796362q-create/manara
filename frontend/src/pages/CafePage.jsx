import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingCart, Coffee, Flame, Snowflake, Cake, Loader2 } from 'lucide-react';
import Hero from '../components/Hero';

const categories = [
  { name: 'All', icon: Coffee },
  { name: 'Coffee', icon: Flame },
  { name: 'Drink', icon: Snowflake },
  { name: 'Snack', icon: Cake },
];

const CafePage = ({ addToCart }) => {
  const [coffeeItems, setCoffeeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/menu');
        const data = await res.json();
        
        const cafeMenu = data
          .filter(item => item.category === 'Cafe')
          .map(item => ({
            ...item,
            id: item._id,
            image: item.imageUrl,
            desc: item.description,
            category: item.type // Use database type for UI filtering
          }));

          
        setCoffeeItems(cafeMenu);
      } catch (err) {
        console.error('Error fetching cafe menu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCafe();
  }, []);

  const filtered = activeCategory === 'All'
    ? coffeeItems
    : coffeeItems.filter(i => i.category === activeCategory);

  const handleAdd = (item) => {
    addToCart(item, 'Cafe');
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const catColorMap = {
    Coffee: 'from-orange-500 to-red-500',
    Drink: 'from-blue-500 to-cyan-400',
    Snack: 'from-amber-500 to-yellow-400',
    All: 'from-manara-dark to-gray-700',
  };

  return (
    <div className="bg-[#fbfcfd]">
      <Hero
        title="Elite Cafe"
        subtitle="Sip the Perfection"
        bgImage="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-manara-gold font-black uppercase tracking-[0.3em] text-sm mb-4 block">
            Crafted with Love
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-manara-dark mb-4">Our Signature Menu</h2>
          <p className="text-gray-400 font-medium text-xl max-w-xl mx-auto">
            Every cup tells a story. Discover flavors that awaken your senses.
          </p>
          <div className="w-24 h-1.5 bg-manara-gold mx-auto rounded-full mt-6" />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                activeCategory === name
                  ? `bg-gradient-to-r ${catColorMap[name]} text-white shadow-2xl`
                  : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-manara-gold/20 hover:text-manara-dark shadow-sm'
              }`}
            >
              <Icon className="w-4 h-4" /> {name}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-manara-gold animate-spin mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Coffee Menu...</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: idx * 0.06 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Category tag */}
                    <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg bg-gradient-to-r ${catColorMap[item.category] || 'from-gray-500 to-gray-700'}`}>
                      {item.category}
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 right-4 bg-white/15 backdrop-blur-md border border-white/20 text-white font-black text-base px-4 py-1.5 rounded-2xl">
                      ${item.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-grow">
                    <h3 className="text-xl font-black text-manara-dark mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed flex-grow mb-6">{item.desc}</p>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAdd(item)}
                      className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                        addedId === item.id
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20 shadow-xl'
                          : 'bg-manara-dark text-manara-gold hover:bg-manara-gold hover:text-manara-dark shadow-manara-dark/10 shadow-xl'
                      }`}
                    >
                      {addedId === item.id
                        ? <><ShoppingCart className="w-4 h-4" /> Added!</>
                        : <><Plus className="w-4 h-4" /> Add to Order</>
                      }
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Ambiance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative overflow-hidden rounded-[3rem] shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-72 object-cover brightness-50"
            alt="Cafe ambiance"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <Coffee className="w-14 h-14 text-manara-gold mb-4" />
            <h3 className="text-4xl font-black mb-3">Come, Stay a While</h3>
            <p className="text-gray-300 font-medium text-lg max-w-lg">
              A warm, elegant space to recharge, connect, and enjoy the finest brews in Mogadishu.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CafePage;
