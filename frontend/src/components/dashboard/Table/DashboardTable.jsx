import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Search } from 'lucide-react';

const DashboardTable = ({ data, activeTab }) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
           <div>
              <h2 className="text-3xl font-black text-manara-dark">{activeTab} Details</h2>
              <p className="text-gray-400 font-medium">Overview of all current items and services.</p>
           </div>
           
           <div className="relative w-full md:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-manara-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-gray-50 border border-transparent focus:border-manara-gold/50 focus:bg-white pl-16 pr-8 py-4 rounded-2xl w-full outline-none transition-all font-medium text-manara-dark shadow-sm" 
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-[11px] uppercase tracking-[0.2em] font-black">
                <th className="pb-6 px-4">Identifier</th>
                <th className="pb-6 px-4">Category</th>
                <th className="pb-6 px-4">Amount</th>
                <th className="pb-6 px-4">Status</th>
                <th className="pb-6 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={idx} 
                  className="group hover:bg-gray-50/70 transition-colors"
                >
                  <td className="py-8 px-4 font-black text-manara-dark text-lg whitespace-nowrap">{row.name}</td>
                  <td className="py-8 px-4">
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest bg-gray-100/50 px-3 py-1 rounded-lg border border-gray-100">
                      {row.cat}
                    </span>
                  </td>
                  <td className="py-8 px-4 font-black text-manara-dark text-lg">${row.price}</td>
                  <td className="py-8 px-4">
                     <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ring-1 ${
                       row.status === 'In Stock' || row.status === 'Available'
                       ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' 
                       : 'bg-amber-50 text-amber-600 ring-amber-200'
                     }`}>
                       {row.status}
                     </span>
                  </td>
                  <td className="py-8 px-4 text-right">
                     <div className="flex justify-end gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl hover:text-manara-gold hover:border-manara-gold/30 hover:shadow-manara-gold/10 transition-all"><Edit className="w-5 h-5" /></button>
                        <button className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl hover:text-red-500 hover:border-red-500/30 hover:shadow-red-500/10 transition-all"><Trash2 className="w-5 h-5" /></button>
                     </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
