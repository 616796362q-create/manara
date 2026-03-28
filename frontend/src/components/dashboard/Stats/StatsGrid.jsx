import React from 'react';
import { motion } from 'framer-motion';

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, idx) => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -5 }} 
          key={stat.label} 
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6"
        >
           <div className={`p-4 rounded-2xl ${stat.color}`}>
              <stat.icon className="w-8 h-8" />
           </div>
           <div>
              <p className="text-gray-400 text-sm font-medium tracking-wide uppercase px-1">{stat.label}</p>
              <p className="text-3xl font-black text-manara-dark">{stat.value}</p>
           </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;
