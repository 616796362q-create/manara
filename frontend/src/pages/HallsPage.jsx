import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Globe, Landmark, Loader2 } from 'lucide-react';
import Hero from '../components/Hero';
import HallBookingModal from '../components/HallBookingModal';

const typeIcons = {
  'Royal Grand Ballroom': '💍',
  'Crystal Conference Hall': '🎤',
  'Garden Party Venue': '🌿',
};

const HallsPage = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHall, setSelectedHall] = useState(null);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/rooms');
        const data = await res.json();
        const hallList = data
          .filter(r => r.type === 'Hall')
          .map(r => ({
            ...r,
            id: r._id,
            image: r.imageUrl,
            capacity: r.capacity || 500 // Fallback capacity
          }));
        setHalls(hallList);
      } catch (err) {
        console.error('Error fetching halls:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHalls();
  }, []);

  return (
    <div>
      <Hero
        title="Event Halls"
        subtitle="Where Magic Happens"
        bgImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000"
      />

      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-manara-gold font-black uppercase tracking-[0.3em] text-sm mb-4 block">Book Your Event</span>
          <h2 className="text-4xl md:text-6xl font-black text-manara-dark mb-6">Our Premier Venues</h2>
          <p className="text-gray-400 font-medium text-xl max-w-xl mx-auto">Reserve your perfect hall via WhatsApp or our online form. Instant confirmation guaranteed.</p>
          <div className="w-24 h-1.5 bg-manara-gold mx-auto rounded-full mt-6" />
        </div>

        {/* Halls Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-manara-gold animate-spin mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Premier Halls...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {halls.map((hall, idx) => (
              <motion.div
                key={hall.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 group"
              >
                {/* Hall Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hall.image}
                    alt={hall.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-6 left-6 text-4xl">{typeIcons[hall.name] || '🏛️'}</div>
                  <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-black text-sm">
                    ${hall.price.toLocaleString()} / Event
                  </div>
                </div>

                {/* Hall Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-black text-manara-dark mb-2">{hall.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-sm mb-8">
                    <Users className="w-4 h-4" />
                    <span>Up to {hall.capacity} guests</span>
                  </div>

                  {/* Booking Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setSelectedHall(hall)}
                      className="btn-premium w-full py-5 text-lg shadow-xl shadow-manara-gold/20 flex items-center justify-center gap-3"
                    >
                      <Landmark className="w-5 h-5" /> Reserve This Hall
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          const msg = `🎪 *MANARA PLAZA*%0A%0AHello, I'd like to reserve *${hall.name}* for my event. Capacity needed: up to ${hall.capacity} guests.`;
                          window.open(`https://wa.me/252615000000?text=${msg}`, '_blank');
                        }}
                        className="flex items-center justify-center gap-2 py-4 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all ring-1 ring-emerald-200"
                      >
                        <MessageCircle className="w-5 h-5" /> WhatsApp
                      </button>
                      <button
                        onClick={() => setSelectedHall(hall)}
                        className="flex items-center justify-center gap-2 py-4 bg-purple-50 hover:bg-purple-500 text-purple-600 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all ring-1 ring-purple-200"
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
        {selectedHall && (
          <HallBookingModal hall={selectedHall} onClose={() => setSelectedHall(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HallsPage;
