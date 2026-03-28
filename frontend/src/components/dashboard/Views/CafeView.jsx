import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, TrendingUp, Package, ShoppingCart } from 'lucide-react';

const cafeItems = [
  { name: 'Caramel Macchiato', price: 5.5, sales: 42, stock: '85%' },
  { name: 'Iced Latte', price: 4.8, sales: 56, stock: '92%' },
  { name: 'Turkish Coffee', price: 3.5, sales: 28, stock: '70%' },
  { name: 'Butter Croissant', price: 3.2, sales: 34, stock: 'Low' },
];

const CafeView = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-manara-dark">Elite Cafe Operations</h2>
          <p className="text-gray-400 font-medium">Manage coffee sales, inventory, and popular items.</p>
        </div>
        <div className="bg-amber-50 text-amber-600 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest ring-1 ring-amber-200 flex items-center gap-2">
           <Coffee className="w-4 h-4" /> Open for Service
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {cafeItems.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
          >
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                   <Coffee className="w-6 h-6" />
                </div>
                <span className="text-xl font-black text-manara-dark">${item.price}</span>
             </div>
             <h3 className="text-xl font-bold text-manara-dark mb-2">{item.name}</h3>
             <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                   <TrendingUp className="w-4 h-4 text-emerald-500" />
                   <span className="text-xs font-black text-gray-400 uppercase">{item.sales} Sales</span>
                </div>
                <div className="flex items-center gap-2">
                   <Package className={`w-4 h-4 ${item.stock === 'Low' ? 'text-red-500' : 'text-gray-300'}`} />
                   <span className={`text-xs font-black uppercase ${item.stock === 'Low' ? 'text-red-500' : 'text-gray-400'}`}>{item.stock}</span>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-manara-dark rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center ring-4 ring-white/5">
               <ShoppingCart className="w-10 h-10 text-manara-gold" />
            </div>
            <div>
               <h4 className="text-2xl font-black">Daily Coffee Sales</h4>
               <p className="text-gray-400 font-medium">Total revenue generated from cafe today.</p>
            </div>
         </div>
         <div className="text-right">
            <span className="text-5xl font-black text-manara-gold">$1,420.50</span>
            <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mt-2">+12% from yesterday</p>
         </div>
      </div>
    </div>
  );
};

export default CafeView;
