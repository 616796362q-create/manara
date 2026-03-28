import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ title, subtitle, bgImage }) => (
  <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.2 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        src={bgImage} 
        alt={title} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-manara-dark/80 via-manara-dark/40 to-manara-dark/80 backdrop-blur-[2px]"></div>
    </div>
    
    <div className="relative z-10 text-center text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-manara-gold font-black tracking-[0.4em] uppercase text-sm mb-6 block drop-shadow-lg">{subtitle}</span>
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter drop-shadow-2xl">
          {title.split(' ').map((word, i) => (
            <span key={i} className={i % 2 !== 0 ? 'text-manara-gold' : ''}>{word} </span>
          ))}
        </h1>
        <div className="w-32 h-1.5 bg-manara-gold mx-auto rounded-full shadow-lg shadow-manara-gold/50 animate-pulse"></div>
      </motion.div>
    </div>

    {/* Elegant side text */}
    <div className="absolute left-10 bottom-20 hidden md:block vertical-text text-white/20 font-black tracking-[0.5em] text-xs uppercase select-none">
       ESTABLISHED 2024 • MANARA PLAZA
    </div>
  </div>
);

export default Hero;

