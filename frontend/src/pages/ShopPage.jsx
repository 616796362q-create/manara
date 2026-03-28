import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, ShoppingCart, Star, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import Hero from '../components/Hero';

const ShopPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products');
        const data = await res.json();
        setProducts(data.map(p => ({
          ...p,
          id: p._id,
          image: p.imageUrl,
          desc: p.description
        })));
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    addToCart(product, 'Shop');
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="bg-[#fbfcfd]">
      <Hero
        title="Manara Boutique"
        subtitle="Luxury in Every Detail"
        bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-manara-gold font-black uppercase tracking-[0.3em] text-sm mb-4 block">Our Collection</span>
          <h2 className="text-4xl md:text-6xl font-black text-manara-dark mb-4">Elite Essentials</h2>
          <p className="text-gray-400 font-medium text-xl max-w-xl mx-auto">Discover a curated selection of world-class products, exclusively at Manara Plaza.</p>
          <div className="w-24 h-1.5 bg-manara-gold mx-auto rounded-full mt-6" />
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-manara-gold animate-spin mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Collections...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-50 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black px-4 py-2 rounded-2xl">
                    ${product.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <span className="text-[10px] font-black text-manara-gold uppercase tracking-widest mb-1.5">{product.category}</span>
                  <h3 className="text-xl font-black text-manara-dark mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-xs font-medium leading-relaxed flex-grow mb-6">{product.desc}</p>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 ${
                      addedId === product.id
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        : 'bg-manara-dark text-manara-gold hover:bg-manara-gold hover:text-manara-dark shadow-xl shadow-manara-dark/10'
                    }`}
                  >
                    {addedId === product.id ? <><ShoppingCart className="w-4 h-4" /> Added!</> : <><Plus className="w-4 h-4" /> Buy Now</>}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 pt-24 border-t border-gray-100">
           <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-manara-dark mb-2">Authentic Products</h4>
              <p className="text-gray-400 text-sm font-medium">100% genuine luxury goods sourced globally.</p>
           </div>
           <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-manara-gold/10 rounded-2xl flex items-center justify-center text-manara-gold mb-6">
                 <Star className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-manara-dark mb-2">Premium Quality</h4>
              <p className="text-gray-400 text-sm font-medium">Handpicked items that define sophistication.</p>
           </div>
           <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                 <Truck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-manara-dark mb-2">Global Delivery</h4>
              <p className="text-gray-400 text-sm font-medium">Swift and secure shipping to your doorstep.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
