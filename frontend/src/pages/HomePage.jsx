import React from 'react';
import { motion } from 'framer-motion';
import { 
  Hotel, Utensils, Coffee, Landmark, 
  ShoppingBag, ArrowRight, Star, 
  MapPin, Phone, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'hotel',
    title: 'Luxury Hotel',
    description: 'Experience world-class hospitality in our premium suites with breathtaking views.',
    icon: Hotel,
    path: '/hotel', 
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-blue-500'
  },
  {
    id: 'restaurant',
    title: 'Fine Dining',
    description: 'Savor exquisite flavors prepared by our master chefs in an elegant atmosphere.',
    icon: Utensils,
    path: '/restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-orange-500'
  },
  {
    id: 'cafe',
    title: 'Elite Cafe',
    description: 'Premium coffee blends and artisanal pastries for your perfect break.',
    icon: Coffee,
    path: '/cafe',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-amber-600'
  },
  {
    id: 'halls',
    title: 'Event Halls',
    description: 'Stat-of-the-art venues for weddings, conferences, and special celebrations.',
    icon: Landmark,
    path: '/halls',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-purple-600'
  },
];

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-40"
            alt="Manara Plaza Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-manara-dark/60 via-transparent to-manara-dark/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-manara-gold uppercase tracking-[0.4em] font-black mb-6 text-sm drop-shadow-lg">✦ Mogadishu's Finest Destination ✦</h4>
            <h1 className="text-6xl md:text-9xl font-black mb-6 leading-none drop-shadow-2xl tracking-tight">
              MANARA <span className="text-manara-gold">PLAZA</span>
            </h1>
            <div className="w-24 h-1 bg-manara-gold mx-auto mb-8 rounded-full" />
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 font-medium leading-relaxed">
              Hotel · Fine Dining · Elite Cafe · Grand Event Halls
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-manara-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-manara-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Offerings</span>
            <h2 className="text-4xl md:text-6xl font-black text-manara-dark mb-6">World Class Services</h2>
            <div className="w-24 h-1.5 bg-manara-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 h-[500px]"
              >
                <div className="h-2/3 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className={`${service.color} p-4 rounded-2xl shadow-lg ring-4 ring-white`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-manara-dark">{service.title}</h3>
                  <p className="text-gray-500 mb-6 line-clamp-2 leading-relaxed font-medium">
                    {service.description}
                  </p>
                  <Link 
                    to={service.path}
                    className="flex items-center gap-2 text-manara-dark font-black hover:text-manara-gold transition-colors"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-manara-gold/10 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
               <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl h-64 w-full object-cover" alt="Interior" />
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-2xl h-80 w-full object-cover mt-8" alt="Dining" />
               </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h4 className="text-manara-gold font-black tracking-widest uppercase mb-4">The Essence of Manara</h4>
              <h2 className="text-4xl md:text-6xl font-black text-manara-dark mb-8 leading-tight">Beyond Luxury, <br/>An Experience.</h2>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                Manara Plaza isn't just a destination; it's a statement. We combine the comfort of a hotel with the luxury of fine dining into one masterfully crafted environment.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h5 className="text-3xl font-black text-manara-dark mb-1">24/7</h5>
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Premium Service</p>
                </div>
                <div>
                  <h5 className="text-3xl font-black text-manara-dark mb-1">5★</h5>
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Luxury Rating</p>
                </div>
              </div>
              <button className="btn-premium px-12 py-5">Learn More About Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact Preview */}
      <section className="py-20 bg-manara-dark relative text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <MapPin className="text-manara-gold w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Locate Us</p>
              <p className="text-lg font-bold">123 Luxury Ave, Downtown</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <Phone className="text-manara-gold w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Call Us</p>
              <p className="text-lg font-bold">+1 (234) 567-890</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <Mail className="text-manara-gold w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Email Us</p>
              <p className="text-lg font-bold">hello@manara.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
