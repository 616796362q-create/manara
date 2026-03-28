import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Plus, Minus, Trash2, Phone, Globe, User, Check, Loader2 } from 'lucide-react';

const CartPage = ({ cart, updateQty, removeItem, clearCart }) => {
  const [mode, setMode] = useState(null); // 'online'
  const [form, setForm] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  const checkoutWhatsApp = () => {
    const adminPhone = "+252615000000"; 
    const itemsList = cart.map(i => `* ${i.name} (${i.qty}x) - $${i.price * i.qty}`).join('%0A');
    const message = `🏢 *MANARA PLAZA - NEW ORDER*%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Price:* $${total}%0A%0A_Please contact the customer for delivery details._`;
    window.open(`https://wa.me/${adminPhone}?text=${message}`);
  };

  const handleOnlineCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    const orderData = {
      customerName: form.name,
      phone: form.phone,
      items: cart,
      totalPrice: total,
      serviceType: 'Restaurant',
      status: 'Pending',
    };

    try {
      await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      setDone(true);
      setTimeout(() => {
        clearCart();
        setMode(null);
        setDone(false);
      }, 3000);
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to process order. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 pt-32">
       <ShoppingBag className="w-20 h-20 text-gray-200" />
       <h2 className="text-2xl font-bold">Your bag is empty</h2>
       <p className="text-gray-400">Add some luxury items to get started.</p>
       <Link to="/" className="btn-premium">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-32 font-outfit">
      <h1 className="text-4xl font-black mb-12 flex items-center gap-4 text-manara-dark">
        <ShoppingCart className="w-10 h-10 text-manara-gold" /> Your Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={`${item.id}-${item.service}`} className="flex items-center gap-6 bg-white p-5 rounded-3xl shadow-sm border border-gray-50 group hover:shadow-xl transition-all">
              <img src={item.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" alt={item.name} />
              <div className="flex-1">
                 <h3 className="font-bold text-lg text-manara-dark">{item.name}</h3>
                 <p className="text-[10px] text-manara-gold uppercase tracking-[0.2em] font-black">{item.service}</p>
                 <div className="flex items-center gap-4 mt-3">
                    <button onClick={() => updateQty(item, -1)} className="hover:text-manara-gold p-1 bg-gray-50 rounded-lg"><Minus className="w-3 h-3" /></button>
                    <span className="font-black text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item, 1)} className="hover:text-manara-gold p-1 bg-gray-50 rounded-lg"><Plus className="w-3 h-3" /></button>
                 </div>
              </div>
              <div className="text-right">
                <p className="font-black text-lg text-manara-dark">${item.price * item.qty}</p>
                <button onClick={() => removeItem(item)} className="text-gray-300 hover:text-red-500 mt-2 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-gray-50 sticky top-32">
            {done ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-100">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-manara-dark mb-1">Order Placed!</h3>
                <p className="text-xs text-gray-400">Your order has been sent to MongoDB.</p>
              </motion.div>
            ) : mode === 'online' ? (
              <form onSubmit={handleOnlineCheckout} className="space-y-4">
                <h3 className="text-xl font-black text-manara-dark mb-4">Checkout Details</h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input required type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-gray-50 pl-11 pr-4 py-3 rounded-xl outline-none text-sm font-medium focus:bg-white border-2 border-transparent focus:border-manara-gold/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input required type="tel" placeholder="+252 61..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-gray-50 pl-11 pr-4 py-3 rounded-xl outline-none text-sm font-medium focus:bg-white border-2 border-transparent focus:border-manara-gold/20" />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setMode(null)} className="flex-1 py-3 bg-gray-50 rounded-xl font-black text-[10px] uppercase text-gray-400">Back</button>
                  <button disabled={loading} type="submit" className="flex-1 btn-premium py-3 text-[10px] shadow-lg shadow-manara-gold/20 flex items-center justify-center">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Order'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                  <p className="text-4xl font-black text-manara-dark">${total}</p>
                </div>
                
                <div className="space-y-3">
                  <button onClick={() => setMode('online')} className="w-full btn-premium py-4 flex items-center justify-center gap-3 shadow-xl shadow-manara-gold/20">
                     <Globe className="w-5 h-5" /> Online Checkout
                  </button>
                  <button onClick={checkoutWhatsApp} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
                     <Phone className="w-5 h-5" /> WhatsApp
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">Secure Premium Experience</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
