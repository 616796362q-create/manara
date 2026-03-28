import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ tabs, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('manara_auth');
    navigate('/');
  };

  return (
    <div className="w-80 b h-screen sticky top-0 bg-manara-dark border-r border-white/5 flex flex-col p-8 z-50">
      {/* Brand */}
      <div className="flex items-center gap-4 mb-20">
        <div className="w-12 h-12 bg-manara-gold rounded-full flex items-center justify-center font-black text-manara-dark text-xl ring-4 ring-manara-gold/10">
          M
        </div>
        <div>
          <h2 className="text-white font-black tracking-widest text-lg uppercase">Manara</h2>
          <p className="text-manara-gold text-[8px] font-black uppercase tracking-[0.4em]">Plaza Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
              activeTab === tab.name 
              ? 'bg-manara-gold text-manara-dark shadow-xl shadow-manara-gold/10' 
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-4">
               <tab.icon className={`w-5 h-5 ${activeTab === tab.name ? 'text-manara-dark' : 'text-gray-500 group-hover:text-manara-gold'}`} />
               <span className="font-black text-xs uppercase tracking-widest">{tab.name}</span>
            </div>
            {activeTab === tab.name && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="mt-auto flex items-center gap-4 p-4 text-gray-500 hover:text-red-500 transition-colors font-black text-xs uppercase tracking-widest"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>

      {/* Version */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Pipeline v2.1.0 • Stable</p>
      </div>
    </div>
  );
};

export default Sidebar;
