import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple Master Password Check
    if (password === '1234') {
      localStorage.setItem('manara_auth', 'true');
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#fbfcfd] flex items-center justify-center px-4">
      <div className="max-w-md w-full relative">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-manara-gold/5 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-12 relative z-10 text-center"
        >
          <div className="inline-flex items-center justify-center p-5 bg-manara-dark rounded-3xl mb-8 shadow-xl shadow-manara-dark/20 ring-4 ring-manara-gold/10">
             <ShieldCheck className="w-10 h-10 text-manara-gold" />
          </div>
          
          <h1 className="text-4xl font-black text-manara-dark mb-4 tracking-tight text-center">Security Access</h1>
          <p className="text-gray-400 font-medium mb-12">Enter the master password to access the portal.</p>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-4">
              <div className="relative group">
                <Lock className={`absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-manara-gold'}`} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full bg-gray-50 border-2 px-16 py-5 rounded-[2rem] outline-none transition-all font-black text-xl tracking-[0.5em] text-center ${error ? 'border-red-500 bg-red-50 animate-shake' : 'border-transparent focus:border-manara-gold/50 focus:bg-white'}`}
                  required
                />
              </div>
              {error && <p className="text-red-500 font-bold text-sm animate-bounce">Access Denied! Incorrect Password.</p>}
            </div>

            <button type="submit" className="btn-premium w-full py-6 text-xl shadow-2xl shadow-manara-gold/30 flex items-center justify-center gap-4 group">
              Unlock Portal <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-gray-50 text-gray-300 font-bold uppercase tracking-[0.3em] text-[10px]">
             Authorized Personal Access Only
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
