import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hotel, CheckCircle, Trash2, User, Users, Calendar, Phone, Clock } from 'lucide-react';

const rooms = [
  { id: '101', type: 'Single', status: 'Available' },
  { id: '102', type: 'Double', status: 'Occupied' },
  { id: '103', type: 'Single', status: 'Available' },
  { id: '104', type: 'Double', status: 'Cleaning' },
  { id: '105', type: 'Single', status: 'Occupied' },
  { id: '106', type: 'Double', status: 'Available' },
  { id: '107', type: 'Single', status: 'Available' },
  { id: '108', type: 'Double', status: 'Available' },
];

const HotelView = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('manara_bookings') || '[]');
    setBookings(stored);
  }, []);

  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('manara_bookings', JSON.stringify(updated));
  };

  const markCheckedIn = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'Checked In' } : b);
    setBookings(updated);
    localStorage.setItem('manara_bookings', JSON.stringify(updated));
  };

  const singleCount = rooms.filter(r => r.type === 'Single' && r.status === 'Available').length;
  const doubleCount = rooms.filter(r => r.type === 'Double' && r.status === 'Available').length;

  return (
    <div className="p-10 space-y-12">
      {/* Room Availability Summary */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black text-manara-dark">Hotel Operations</h2>
            <p className="text-gray-400 font-medium">Live room grid and confirmed bookings.</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-blue-50 border-2 border-blue-100 p-8 rounded-3xl flex items-center gap-6">
            <div className="p-4 bg-blue-500 rounded-2xl shadow-xl shadow-blue-500/20">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">Single Rooms</p>
              <p className="text-4xl font-black text-manara-dark">{singleCount} <span className="text-base text-gray-400 font-bold">Available</span></p>
            </div>
          </div>
          <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-3xl flex items-center gap-6">
            <div className="p-4 bg-rose-500 rounded-2xl shadow-xl shadow-rose-500/20">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-rose-400 mb-1">Double Rooms</p>
              <p className="text-4xl font-black text-manara-dark">{doubleCount} <span className="text-base text-gray-400 font-bold">Available</span></p>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.05 }}
              className={`p-5 rounded-3xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all shadow-sm hover:shadow-xl ${
                room.status === 'Available' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                room.status === 'Occupied' ? 'bg-rose-50 border-rose-100 text-rose-700' :
                'bg-amber-50 border-amber-100 text-amber-700'
              }`}
            >
              <span className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">{room.type}</span>
              <span className="text-3xl font-black mb-2">{room.id}</span>
              <div className="text-[8px] font-black uppercase tracking-widest bg-white/60 px-2 py-1 rounded-lg">{room.status}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-black text-manara-dark">Online Bookings</h3>
            <p className="text-gray-400 font-medium">{bookings.length} reservation{bookings.length !== 1 ? 's' : ''} received</p>
          </div>
          <span className={`px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest ring-1 ${bookings.length > 0 ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' : 'bg-gray-50 text-gray-400 ring-gray-200'}`}>
            {bookings.length > 0 ? `${bookings.length} Active` : 'No Bookings Yet'}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <Hotel className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-xs">No bookings yet. Share the hotel page to start receiving reservations.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border-2 border-gray-50 hover:border-manara-gold/20 p-8 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${b.roomType === 'Single Room' ? 'bg-blue-50' : 'bg-rose-50'}`}>
                    {b.roomType === 'Single Room'
                      ? <User className="w-8 h-8 text-blue-500" />
                      : <Users className="w-8 h-8 text-rose-500" />
                    }
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-manara-dark">{b.guestName}</h4>
                    <p className="text-gray-400 font-medium">{b.roomType} · ${b.price}/night · {b.nights} night(s)</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                        <Phone className="w-3.5 h-3.5" /> {b.phone}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                        <Calendar className="w-3.5 h-3.5" /> Check-in: {b.checkIn}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-300 font-bold">
                        <Clock className="w-3.5 h-3.5" /> Booked: {b.bookedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ring-1 ${
                    b.status === 'Checked In' ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' : 'bg-blue-50 text-blue-600 ring-blue-200'
                  }`}>{b.status}</span>
                  {b.status !== 'Checked In' && (
                    <button
                      onClick={() => markCheckedIn(b.id)}
                      className="p-3 bg-white border border-gray-100 rounded-xl hover:text-emerald-500 hover:border-emerald-200 transition-all shadow-sm"
                      title="Mark as Checked In"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="p-3 bg-white border border-gray-100 rounded-xl hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
                    title="Delete Booking"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelView;
