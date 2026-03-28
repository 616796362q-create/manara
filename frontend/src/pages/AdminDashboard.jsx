import React, { useState, useEffect } from 'react';
import { 
  Hotel, Utensils, ShoppingCart, 
  Calendar, Plus, Landmark, Coffee, LayoutDashboard,
  RefreshCw, Loader2, User, Phone, CheckCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Modular Components
import StatsGrid from '../components/dashboard/Stats/StatsGrid';
import Sidebar from '../components/dashboard/Sidebar';

// Department Views
import HotelView from '../components/dashboard/Views/HotelView';
import RestaurantView from '../components/dashboard/Views/RestaurantView';
import OverviewView from '../components/dashboard/Views/OverviewView';
import CafeView from '../components/dashboard/Views/CafeView';
import HallsView from '../components/dashboard/Views/HallsView';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    hotelOccupancy: 0,
    hallBookings: 0,
    menuOrders: 0,
    recentOrders: []
  });

  const fetchMongoDBData = async () => {
    try {
      setLoading(true);
      // Fetch all core collections from MongoDB
      const [ordersRes, roomsRes, menuRes] = await Promise.all([
        fetch('http://localhost:5001/api/orders'),
        fetch('http://localhost:5001/api/rooms'),
        fetch('http://localhost:5001/api/menu')
      ]);

      const orders = await ordersRes.json();
      const rooms = await roomsRes.json();
      const menu = await menuRes.json();

      // Inventory Stats
      const totalInventoryRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
      
      setStats({
        totalRevenue: totalInventoryRevenue,
        hotelOccupancy: rooms.length, // Total Rooms in Database
        hallBookings: orders.length, 
        menuOrders: menu.length, // Total Menu Items
        recentOrders: orders.slice(-10).reverse()
      });

    } catch (err) {
      console.error('Error syncing with MongoDB:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMongoDBData();
    const interval = setInterval(fetchMongoDBData, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderView = () => {
    if (loading) return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-manara-gold animate-spin mb-4" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Syncing with MongoDB Database...</p>
      </div>
    );

    switch (activeTab) {
      case 'Live Orders':
        return (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-3xl font-black text-manara-dark">Recent Activity</h3>
               <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live
               </span>
            </div>
            <div className="overflow-x-auto scroller-hide">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 pb-4">
                    <th className="pb-6">Customer & Phone</th>
                    <th className="pb-6">Department</th>
                    <th className="pb-6">Total Amount</th>
                    <th className="pb-6">Current Status</th>
                    <th className="pb-6">Order Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats.recentOrders.length > 0 ? stats.recentOrders.map((order) => (
                    <tr key={order._id} className="group hover:bg-gray-50/50 transition-all">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                              <User className="w-5 h-5" />
                           </div>
                           <div className="flex flex-col">
                              <span className="font-bold text-manara-dark">{order.customerName}</span>
                              <span className="text-[10px] text-gray-400 font-medium">{order.phone}</span>
                           </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${
                          order.serviceType === 'Hotel' ? 'bg-blue-50 text-blue-600' :
                          order.serviceType === 'Event' ? 'bg-indigo-50 text-indigo-600' :
                          'bg-orange-50 text-orange-600'
                        }`}>
                          {order.serviceType}
                        </span>
                      </td>
                      <td className="py-6 font-black text-lg text-manara-dark">${order.totalPrice}</td>
                      <td className="py-6">
                        <div className="flex items-center gap-2 font-black text-[10px] uppercase text-emerald-500 bg-emerald-50/50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100">
                          <CheckCircle className="w-3.5 h-3.5" /> {order.status}
                        </div>
                      </td>
                      <td className="py-6 text-[10px] text-gray-400 font-bold tracking-tight">
                        <div className="flex items-center gap-2">
                           <Clock className="w-3.5 h-3.5" />
                           {new Date(order.createdAt).toLocaleString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs">No Recent Orders found in MongoDB</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Hotel': return <HotelView />;
      case 'Restaurant': return <RestaurantView />;
      case 'Cafe': return <CafeView />;
      case 'Halls': return <HallsView />;
      case 'Overview':
      default: return <OverviewView stats={stats} />;
    }
  };

  const navTabs = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Live Orders', icon: ShoppingCart },
    { name: 'Hotel', icon: Hotel },
    { name: 'Restaurant', icon: Utensils },
    { name: 'Cafe', icon: Coffee },
    { name: 'Halls', icon: Landmark },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-7">
             <div className="p-6 bg-manara-dark rounded-[2.5rem] shadow-2xl ring-4 ring-manara-gold/10">
                <LayoutDashboard className="w-10 h-10 text-manara-gold" />
             </div>
             <div>
                <h1 className="text-5xl font-black text-manara-dark tracking-tight">System <span className="text-manara-gold uppercase">Hub</span></h1>
                <p className="text-gray-400 mt-2 font-bold text-xs uppercase tracking-[0.3em] flex items-center gap-3">
                   <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" /> 
                   MongoDB Connection: Active & Synced
                </p>
             </div>
          </div>
          <div className="flex gap-4">
             <button onClick={fetchMongoDBData} className="px-8 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest text-manara-dark">
                <RefreshCw className={`w-4 h-4 text-manara-gold ${loading ? 'animate-spin' : ''}`} /> Sync Database
             </button>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="mb-14">
           {/* We pass the formatted data to StatsGrid */}
           <StatsGrid stats={[
              { label: 'Live Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: ShoppingCart, color: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' },
              { label: 'Total Rooms', value: stats.hotelOccupancy, icon: Hotel, color: 'bg-blue-50 text-blue-600 ring-1 ring-blue-200' },
              { label: 'Menu Selection', value: stats.menuOrders, icon: Utensils, color: 'bg-orange-50 text-orange-600 ring-1 ring-orange-200' },
              { label: 'Live Orders', value: stats.recentOrders.length, icon: Calendar, color: 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200' },
           ]} />

        </div>

        {/* View Selection */}
        <div className="bg-white rounded-[4rem] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
           {/* Navigation Tabs */}
           <div className="flex border-b border-gray-50 overflow-x-auto scroller-hide bg-gray-50/50">
              {navTabs.map(tab => (
                <button 
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`px-10 py-8 font-black text-[10px] uppercase tracking-[0.2em] transition-all relative flex items-center gap-3 ${
                    activeTab === tab.name ? 'text-manara-gold bg-white' : 'text-gray-400 hover:text-manara-dark hover:bg-white/50'
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.name ? 'text-manara-gold' : 'text-gray-300'}`} />
                  {tab.name}
                  {activeTab === tab.name && (
                    <motion.div layoutId="activeTabUnder" className="absolute bottom-0 left-0 right-0 h-1.5 bg-manara-gold rounded-full" />
                  )}
                </button>
              ))}
           </div>

           <div className="p-1">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, scale: 0.99 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.01 }}
                 transition={{ duration: 0.2 }}
               >
                 {renderView()}
               </motion.div>
             </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
