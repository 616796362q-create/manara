import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HotelPage from './pages/HotelPage';
import RestaurantPage from './pages/RestaurantPage';
import CafePage from './pages/CafePage';
import HallsPage from './pages/HallsPage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('manara_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [cart, setCart] = useState([]);

  // --- Cart State Logic ---
  const addToCart = (item, service) => {
    const existing = cart.find(i => i.id === item.id && i.service === service);
    if (existing) {
      setCart(cart.map(i => (i.id === item.id && i.service === service) ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, service, qty: 1 }]);
    }
  };

  const updateQty = (item, delta) => {
    setCart(cart.map(i => (i.id === item.id && i.service === item.service) ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (item) => {
    setCart(cart.filter(i => !(i.id === item.id && i.service === item.service)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleBooking = (item) => {
    const message = `🏢 *MANARA PLAZA - NEW BOOKING*%0A%0A*Service:* ${item.name}%0A*Price:* $${item.price}%0A%0A_Please confirm my booking._`;
    window.open(`https://wa.me/+252615000000?text=${message}`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] selection:bg-manara-gold selection:text-white flex flex-col font-outfit">
        {/* Navigation */}
        <Navbar cartCount={cart.reduce((acc, i) => acc + i.qty, 0)} />
        
        {/* Main Content Area */}
        <main className="flex-grow pt-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotel" element={<HotelPage />} />
            <Route path="/restaurant" element={<RestaurantPage addToCart={addToCart} />} />
            <Route path="/cafe" element={<CafePage addToCart={addToCart} />} />
            <Route path="/halls" element={<HallsPage />} />
            <Route path="/cart" element={<CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} clearCart={clearCart} />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
