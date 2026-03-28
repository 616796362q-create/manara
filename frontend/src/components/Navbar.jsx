import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Hotel, Utensils, Coffee, PartyPopper, LayoutDashboard, Landmark, LogOut, User, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(localStorage.getItem('manara_auth') === 'true');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('manara_auth');
    setIsAuth(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Hotel },
    { name: 'Hotel', path: '/hotel', icon: Landmark },
    { name: 'Restaurant', path: '/restaurant', icon: Utensils },
    { name: 'Cafe', path: '/cafe', icon: Coffee },
    { name: 'Events', path: '/halls', icon: PartyPopper },
  ];

  return (
    <nav className="glass-morphism fixed top-0 w-full z-50 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Manara Plaza Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-manara-gold group-hover:text-white transition-colors uppercase">MANARA PLAZA</span>
              <span className="text-[10px] tracking-[0.2em] font-light text-gray-300 uppercase">Premium Estate</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest hover:text-manara-gold transition-all duration-300 ${location.pathname === link.path ? 'text-manara-gold' : 'text-gray-300'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-white/10 mx-2" />
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-manara-gold transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-manara-dark">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuth ? (
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-red-500/20"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-manara-gold hover:bg-white text-manara-dark px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-manara-gold/20 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Portal
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-manara-dark">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass-morphism absolute top-20 w-full flex flex-col p-6 space-y-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 text-xl font-black uppercase tracking-widest p-4 rounded-2xl transition-all ${location.pathname === link.path ? 'bg-manara-gold text-manara-dark' : 'text-white hover:bg-white/10'}`}
              >
                <link.icon className="w-6 h-6" />
                {link.name}
              </Link>
            ))}
            
            <div className="pt-6 border-t border-white/10">
              {isAuth ? (
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full bg-red-500 text-white py-5 rounded-2xl font-black text-center uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                  <LogOut className="w-6 h-6" /> Sign Out
                </button>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-manara-gold text-manara-dark py-5 rounded-2xl font-black text-center uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                  <User className="w-6 h-6" /> Access Portal
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
