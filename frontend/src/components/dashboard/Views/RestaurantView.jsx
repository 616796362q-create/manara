import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock } from 'lucide-react';

const orders = [
  { table: '04', items: ['Tenderloin Steak', 'Orange Juice'], status: 'Cooking', time: '5m ago' },
  { table: '12', items: ['Caesar Salad', 'Latte'], status: 'Ready', time: '2m ago' },
  { table: '01', items: ['Margherita Pizza', 'Cola'], status: 'Cooking', time: '12m ago' },
  { table: '08', items: ['Grilled Salmon', 'Wine'], status: 'Pending', time: '1m ago' },
];

const RestaurantView = () => {
  return (
    <div className="p-10">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-manara-dark">Restaurant Orders</h2>
          <p className="text-gray-400 font-medium">Track live kitchen tickets and table status.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-emerald-50 text-emerald-600 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest ring-1 ring-emerald-200">2 Active Kitchen</button>
          <button className="btn-premium px-8 py-4 flex items-center gap-2">
            <Utensils className="w-5 h-5" /> New Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {orders.map((order, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-8 rounded-[2.5rem] shadow-xl border relative overflow-hidden flex flex-col justify-between h-80 ${
              order.status === 'Ready' ? 'bg-emerald-50 border-emerald-100' : 
              order.status === 'Cooking' ? 'bg-amber-50 border-amber-100' : 
              'bg-blue-50 border-blue-100'
            }`}
          >
             <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-black text-manara-dark">Table {order.table}</span>
                  <div className={`p-4 rounded-2xl bg-white shadow-xl shadow-current/10`}>
                    <Utensils className={`w-5 h-5 ${
                      order.status === 'Ready' ? 'text-emerald-500' : 
                      order.status === 'Cooking' ? 'text-amber-500' : 
                      'text-blue-500'
                    }`} />
                  </div>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-lg font-bold text-manara-dark/70 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-manara-gold rounded-full" /> {item}
                    </p>
                  ))}
                </div>
             </div>
             
             <div className="flex justify-between items-end">
                <span className="text-gray-400 font-bold text-xs flex items-center gap-1">
                   <Clock className="w-3.5 h-3.5" /> {order.time}
                </span>
                <button className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  order.status === 'Ready' ? 'bg-emerald-500 text-white' : 
                  'bg-white text-manara-dark border border-gray-100'
                }`}>
                   {order.status === 'Ready' ? 'Mark Served' : 'Mark Ready'}
                </button>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantView;
