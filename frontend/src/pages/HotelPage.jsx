import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Star, Wifi, Coffee, Shield, MessageCircle, Globe, Loader2 } from 'lucide-react';
import Hero from '../components/Hero';
import BookingModal from '../components/BookingModal';
import API_URL from '../config';

const categories = ['All', 'Single', 'Double'];

const HotelPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/rooms`);

        const data = await res.json();
        
        // Filter only Hotel rooms and map fields to match UI expectations
        const hotelRooms = data
          .filter(r => r.type === 'Hotel')
          .map(r => ({
            ...r,
            image: r.imageUrl,
            desc: r.description,
            category: r.roomType || 'Single',
            icon: r.name.toLowerCase().includes('suite') ? 'double' : 'single',
            features: ['Premium Stay', 'Free Wi-Fi', 'Daily Breakfast', 'Private Bathroom'], // Default features
            color: r.name.toLowerCase().includes('suite') ? 'text-rose-500' : 'text-blue-500',
            bg: r.name.toLowerCase().includes('suite') ? 'bg-rose-50' : 'bg-blue-50',
            ring: r.name.toLowerCase().includes('suite') ? 'ring-rose-200' : 'ring-blue-200',
          }));
          
        setRooms(hotelRooms);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filtered = activeCategory === 'All' 
    ? rooms 
    : rooms.filter(r => r.category === activeCategory);

  return (
    <div>
      <Hero
        title="Manara Hotel"
        subtitle="Experience True Luxury"
        bgImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-manara-gold font-black uppercase tracking-[0.3em] text-sm mb-4 block">Choose Your Stay</span>
          <h2 className="text-4xl md:text-6xl font-black text-manara-dark mb-6">Our Room Types</h2>
          <p className="text-gray-400 font-medium text-xl max-w-xl mx-auto">Select the perfect room for your needs and book instantly via WhatsApp or our online form.</p>
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

        {/* Room Cards */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-manara-gold animate-spin mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Luxury Rooms...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filtered.map((room, idx) => (
              <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 group"
              >
                {/* Room Image */}
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-6 left-6 p-4 rounded-2xl ${room.bg} ${room.ring} ring-2 shadow-xl`}>
                    {room.icon === 'single'
                      ? <User className={`w-8 h-8 ${room.color}`} />
                      : <Users className={`w-8 h-8 ${room.color}`} />
                    }
                  </div>
                  <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-black text-sm">
                    ${room.price} / Night
                  </div>
                </div>

                {/* Room Info */}
                <div className="p-10">
                  <h3 className="text-3xl font-black text-manara-dark mb-3">{room.name}</h3>
                  <p className="text-gray-400 font-medium mb-8 leading-relaxed">{room.desc}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-10">
                    {room.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <div className={`w-1.5 h-1.5 rounded-full ${room.icon === 'single' ? 'bg-blue-400' : 'bg-rose-400'}`} />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Booking Buttons */}
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="btn-premium w-full py-5 text-lg shadow-xl shadow-manara-gold/20 flex items-center justify-center gap-3"
                    >
                      Book This Room
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          const msg = `🏨 *MANARA PLAZA*%0A%0AHello, I'd like to book a *${room.name}* at $${room.price}/Night.`;
                          window.open(`https://wa.me/252615000000?text=${msg}`, '_blank');
                        }}
                        className="flex items-center justify-center gap-2 py-4 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all ring-1 ring-emerald-200"
                      >
                        <MessageCircle className="w-5 h-5" /> WhatsApp
                      </button>
                      <button
                        onClick={() => setSelectedRoom(room)}
                        className="flex items-center justify-center gap-2 py-4 bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all ring-1 ring-blue-200"
                      >
                        <Globe className="w-5 h-5" /> Online
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelPage;
