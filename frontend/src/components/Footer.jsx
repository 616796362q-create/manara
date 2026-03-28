import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Calendar, Facebook, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => (
  <footer className="bg-manara-dark text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-manara-gold">
           <img src="/logo.png" alt="Logo" className="w-12 h-12 bg-white rounded-full p-1" />
           <span className="text-xl font-bold tracking-widest">MANARA PLAZA</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          The ultimate destination for luxury stays, exquisite dining, and premium shopping experiences in the heart of the city.
        </p>
        <div className="flex gap-4">
          <Facebook className="w-5 h-5 text-gray-400 hover:text-manara-gold cursor-pointer" />
          <Instagram className="w-5 h-5 text-gray-400 hover:text-manara-gold cursor-pointer" />
          <Phone className="w-5 h-5 text-gray-400 hover:text-manara-gold cursor-pointer" />
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6 text-manara-gold">Quick Links</h4>
        <ul className="space-y-3 text-gray-400">
          {['Hotel', 'Restaurant', 'Cafe', 'Event Halls', 'Shop'].map(item => (
            <li key={item}><Link to={"/" + item.toLowerCase().replace(' ', '')} className="hover:text-white transition-colors">{item}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6 text-manara-gold">Contact Us</h4>
        <ul className="space-y-4 text-gray-400">
          <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-manara-gold" /> City Center, Somalia</li>
          <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-manara-gold" /> +123 456 7890</li>
          <li className="flex items-center gap-3"><Calendar className="w-5 h-5 text-manara-gold" /> Open 24/7 (Hotel)</li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6 text-manara-gold">Newsletter</h4>
        <p className="text-gray-400 text-sm mb-4">Subscribe to get exclusive offers.</p>
        <div className="flex overflow-hidden rounded-full">
          <input type="email" placeholder="Email" className="bg-gray-800 border-none px-4 py-2 w-full focus:ring-1 focus:ring-manara-gold outline-none text-white" />
          <button className="bg-manara-gold px-4 py-2 hover:bg-manara-gold-light transition-colors"><ArrowRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-20 pt-8 text-center text-gray-500 text-[10px] uppercase tracking-widest font-medium">
      &copy; {new Date().getFullYear()} Manara Plaza. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
