import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Landmark, CheckCircle, Trash2, User, Users, Calendar, Phone, Clock } from 'lucide-react';

const hallsData = [
  { name: 'Royal Grand Ballroom', capacity: 500, status: 'Available' },
  { name: 'Crystal Conference Hall', capacity: 200, status: 'Booked Today' },
  { name: 'Garden Party Venue', capacity: 350, status: 'Available' },
];

const HallsView = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('manara_hall_bookings') || '[]');
    setBookings(stored);
  }, []);

  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('manara_hall_bookings', JSON.stringify(updated));
  };

  const markConfirmed = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'Approved' } : b);
    setBookings(updated);
    localStorage.setItem('manara_hall_bookings', JSON.stringify(updated));
  };

  return (
    <div className="p-10 space-y-12">
      {/* Hall Status Grid */}
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-black text-manara-dark">Event Halls Management</h2>
          <p className="text-gray-400 font-medium">Live status of all venues and online reservations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {hallsData.map((hall, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl border-2 flex flex-col justify-between h-52 transition-all shadow-sm hover:shadow-xl ${
                hall.status === 'Available' ? 'bg-emerald-50 border-emerald-100' : 'bg-purple-50 border-purple-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-2xl ${hall.status === 'Available' ? 'bg-emerald-500' : 'bg-purple-500'} shadow-xl`}>
                  <Landmark className="w-6 h-6 text-white" />
                </div>
                {hall.status !== 'Available' && (
                  <span className="bg-purple-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full animate-pulse">Booked</span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-black text-manara-dark">{hall.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                    <Users className="w-3.5 h-3.5" /> {hall.capacity} cap.
                  </span>
                  <span className={`text-xs font-black uppercase tracking-widest ${hall.status === 'Available' ? 'text-emerald-500' : 'text-purple-600'}`}>
                    {hall.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hall Bookings */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-black text-manara-dark">Hall Reservations</h3>
            <p className="text-gray-400 font-medium">{bookings.length} reservation{bookings.length !== 1 ? 's' : ''} received</p>
          </div>
          <span className={`px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest ring-1 ${
            bookings.length > 0 ? 'bg-purple-50 text-purple-600 ring-purple-200' : 'bg-gray-50 text-gray-400 ring-gray-200'
          }`}>
            {bookings.length > 0 ? `${bookings.length} Active` : 'No Bookings Yet'}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
            <Landmark className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-xs">No hall bookings yet. Share the events page to start receiving reservations.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border-2 border-gray-50 hover:border-purple-200/50 p-8 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-purple-50">
                    <Landmark className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-manara-dark">{b.guestName}</h4>
                    <p className="text-gray-400 font-medium">{b.hallName} · {b.eventType}</p>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                        <Phone className="w-3.5 h-3.5" /> {b.phone}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                        <Calendar className="w-3.5 h-3.5" /> Event: {b.eventDate}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-300 font-bold">
                        <Clock className="w-3.5 h-3.5" /> Booked: {b.bookedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ring-1 ${
                    b.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' : 'bg-purple-50 text-purple-600 ring-purple-200'
                  }`}>{b.status}</span>
                  {b.status !== 'Approved' && (
                    <button
                      onClick={() => markConfirmed(b.id)}
                      className="p-3 bg-white border border-gray-100 rounded-xl hover:text-emerald-500 hover:border-emerald-200 transition-all shadow-sm"
                      title="Approve"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="p-3 bg-white border border-gray-100 rounded-xl hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
                    title="Delete"
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

export default HallsView;
