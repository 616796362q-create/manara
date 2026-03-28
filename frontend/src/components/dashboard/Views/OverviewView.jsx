import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingCart, Activity, ArrowUpRight } from 'lucide-react';

const OverviewView = ({ stats }) => {
  const performance = [
    { name: 'Hotel Occupancy', value: Math.min(100, stats.hotelOccupancy * 10), color: 'bg-blue-500' },
    { name: 'Menu Selection', value: Math.min(100, stats.menuOrders * 2), color: 'bg-orange-500' },
    { name: 'Boutique Stock', value: Math.min(100, stats.hallBookings * 20), color: 'bg-amber-500' },
    { name: 'Total Revenue', value: 100, color: 'bg-emerald-500' },
  ];

  const recentOrders = stats.recentOrders || [];

  return (
    <div className="p-10 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Performance Chart Section */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-10">
             <div>
               <h3 className="text-2xl font-black text-manara-dark uppercase tracking-tight">Database Metrics</h3>
               <p className="text-gray-400 font-medium text-xs tracking-widest uppercase mt-1">MongoDB Live Synchronization Status</p>
             </div>
             <div className="p-4 bg-emerald-50 rounded-2xl">
                <TrendingUp className="text-emerald-500 w-6 h-6" />
             </div>
          </div>
          
          <div className="space-y-8">
             {performance.map((item, idx) => (
               <div key={idx} className="space-y-3">
                  <div className="flex justify-between font-black text-xs uppercase tracking-widest text-manara-dark">
                     <span>{item.name}</span>
                     <span>{item.name === 'Total Revenue' ? `$${stats.totalRevenue}` : `${item.value}%`}</span>
                  </div>
                  <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${item.value}%` }}
                       transition={{ duration: 1, delay: idx * 0.1 }}
                       className={`${item.color} h-full rounded-full`}
                     />
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Live Status Section */}
        <div className="bg-manara-dark rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden group">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-manara-gold/10 rounded-full blur-3xl animate-pulse"></div>
           <div className="relative z-10">
              <h3 className="text-2xl font-black mb-10 tracking-tight">System Status</h3>
              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-white/5 border border-white/10 p-6 rounded-3xl group-hover:bg-white/10 transition-colors">
                    <Activity className="text-manara-gold w-8 h-8 mb-4 border-b border-manara-gold/10 pb-2" />
                    <p className="text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em] mb-1">Live Pipeline</p>
                    <p className="text-2xl font-black text-emerald-400 tracking-tighter">99.9%</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-3xl group-hover:bg-white/10 transition-colors">
                    <Users className="text-blue-400 w-8 h-8 mb-4 border-b border-blue-400/10 pb-2" />
                    <p className="text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em] mb-1">Seeded Assets</p>
                    <p className="text-2xl font-black tracking-tighter">{stats.hotelOccupancy + stats.menuOrders}</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-3xl group-hover:bg-white/10 transition-colors">
                    <ShoppingCart className="text-orange-400 w-8 h-8 mb-4 border-b border-orange-400/10 pb-2" />
                    <p className="text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em] mb-1">Pending Orders</p>
                    <p className="text-2xl font-black text-manara-gold tracking-tighter">{recentOrders.length}</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center border-dashed border-gray-700">
                    <p className="text-center text-gray-400 font-black text-[9px] uppercase tracking-widest leading-relaxed">Secure Premium<br/>Monitoring</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
         <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-manara-dark uppercase tracking-tight">Recent Synchronization Data</h3>
            <button className="text-manara-gold font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">View Full Log <ArrowUpRight className="w-4 h-4" /></button>
         </div>
         <div className="space-y-4">
            {recentOrders.length > 0 ? recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between p-6 hover:bg-gray-50/50 rounded-3xl transition-all group border border-transparent hover:border-gray-100">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-xs text-manara-dark ring-1 ring-gray-100 group-hover:bg-white transition-all shadow-sm">
                       {order.serviceType.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                       <h4 className="font-black text-manara-dark group-hover:text-manara-gold transition-colors">{order.customerName} Order</h4>
                       <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Confirmed • ${order.totalPrice}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-gray-300 font-black text-[10px] uppercase tracking-[0.2em] block mb-1">Order Logged</span>
                    <span className="text-manara-dark font-black text-[9px] bg-gray-100 px-3 py-1 rounded-full">{new Date(order.createdAt).toLocaleTimeString()}</span>
                 </div>
              </div>
            )) : (
              <div className="py-20 text-center text-gray-300 font-black uppercase tracking-widest text-xs">No Recent Synchronization items found.</div>
            )}
         </div>
      </div>
    </div>
  );
};

export default OverviewView;
