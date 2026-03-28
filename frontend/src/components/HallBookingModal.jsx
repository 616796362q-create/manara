import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Calendar, MessageCircle, Globe, Check, Landmark, Users } from 'lucide-react';

const WHATSAPP_NUMBER = '252615000000';

const HallBookingModal = ({ hall, onClose }) => {
  const [mode, setMode] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', date: '', eventType: 'Wedding' });
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsApp = () => {
    const msg = `🎪 *MANARA PLAZA - HALL BOOKING*%0A%0A*Hall:* ${hall.name}%0A*Capacity:* ${hall.capacity} guests%0A*Price:* $${hall.price}/event%0A%0AHello, I would like to reserve *${hall.name}* for my event.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const handleOnlineSubmit = async (e) => {
    e.preventDefault();
    const booking = {
      customerName: form.name,
      phone: form.phone,
      items: [{
        hallName: hall.name,
        eventType: form.eventType,
        eventDate: form.date,
        price: hall.price
      }],
      totalPrice: hall.price,
      serviceType: 'Event',
      status: 'Confirmed',
    };

    try {
      await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      const legacyBooking = { ...booking, id: Date.now(), bookedAt: new Date().toLocaleString() };
      const existing = JSON.parse(localStorage.getItem('manara_hall_bookings') || '[]');
      localStorage.setItem('manara_hall_bookings', JSON.stringify([legacyBooking, ...existing]));
      
      setSubmitted(true);
      setTimeout(() => onClose(), 2500);
    } catch (err) {
      console.error('Hall booking error:', err);
      alert('Failed to connect to server. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-manara-dark p-10 relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="inline-flex p-4 rounded-2xl bg-purple-500/20 mb-4">
            <Landmark className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-black text-white">{hall.name}</h2>
          <div className="flex items-center gap-6 mt-2">
            <p className="text-manara-gold font-bold text-xl">${hall.price} / Event</p>
            <span className="text-gray-400 font-medium flex items-center gap-1"><Users className="w-4 h-4" /> {hall.capacity} guests</span>
          </div>
        </div>

        <div className="p-10">
          {submitted ? (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-100">
                <Check className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-manara-dark mb-2">Reservation Confirmed!</h3>
              <p className="text-gray-400 font-medium">Your hall booking has been saved. View it in the admin dashboard.</p>
            </motion.div>
          ) : !mode ? (
            <div className="space-y-4">
              <p className="text-gray-500 font-medium mb-8 text-center">How would you like to reserve?</p>
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center gap-5 p-6 bg-emerald-50 border-2 border-emerald-100 hover:border-emerald-400 rounded-3xl transition-all"
              >
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-black text-manara-dark">Reserve via WhatsApp</p>
                  <p className="text-gray-400 font-medium text-sm">Chat directly with our events team</p>
                </div>
              </button>

              <button
                onClick={() => setMode('online')}
                className="w-full flex items-center gap-5 p-6 bg-purple-50 border-2 border-purple-100 hover:border-purple-400 rounded-3xl transition-all"
              >
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 flex-shrink-0">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-black text-manara-dark">Reserve Online</p>
                  <p className="text-gray-400 font-medium text-sm">Fill the form — instant confirmation</p>
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleOnlineSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black text-manara-dark uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input required type="text" placeholder="John Doe" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-gray-50 pl-14 pr-6 py-4 rounded-2xl outline-none font-medium text-manara-dark focus:bg-white border-2 border-transparent focus:border-manara-gold/30 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-manara-dark uppercase tracking-widest">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input required type="tel" placeholder="+252 61 xxxxxxx" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-gray-50 pl-14 pr-6 py-4 rounded-2xl outline-none font-medium text-manara-dark focus:bg-white border-2 border-transparent focus:border-manara-gold/30 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-manara-dark uppercase tracking-widest">Event Type</label>
                <select value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })}
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl outline-none font-bold text-manara-dark focus:bg-white border-2 border-transparent focus:border-manara-gold/30 transition-all"
                >
                  <option>Wedding</option>
                  <option>Birthday Party</option>
                  <option>Conference</option>
                  <option>Graduation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-manara-dark uppercase tracking-widest">Event Date</label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input required type="date" value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-gray-50 pl-14 pr-6 py-4 rounded-2xl outline-none font-medium text-manara-dark focus:bg-white border-2 border-transparent focus:border-manara-gold/30 transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setMode(null)} className="flex-1 py-4 bg-gray-50 rounded-2xl font-black text-gray-400 hover:bg-gray-100 transition-all">Back</button>
                <button type="submit" className="flex-1 btn-premium py-4 shadow-xl shadow-manara-gold/20">Confirm Booking</button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HallBookingModal;
