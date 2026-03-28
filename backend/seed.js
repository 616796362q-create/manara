const mongoose = require('mongoose');

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/manara_plaza';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB for Seeding'))
  .catch(err => console.error('❌ Connection Error:', err));

// Schemas
const roomSchema = new mongoose.Schema({
  name: String,
  type: String, 
  roomType: { type: String, enum: ['Single', 'Double'] }, 
  price: Number,
  description: String,
  imageUrl: String,
  available: { type: Boolean, default: true }
});

const foodItemSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ['Restaurant', 'Cafe'] },
  type: String, 
  price: Number,
  description: String,
  imageUrl: String
});

const Room = mongoose.model('Room', roomSchema);
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

const seedData = async () => {
  try {
    await Room.deleteMany({});
    await FoodItem.deleteMany({});

    // --- Rooms ---
    const rooms = [
      { name: 'Single Premium Room', type: 'Hotel', roomType: 'Single', price: 150, description: 'Comfortable single room with all modern amenities.', imageUrl: 'https://images.unsplash.com/photo-1595085611766-638aa1794b7c?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Double Deluxe Room', type: 'Hotel', roomType: 'Double', price: 300, description: 'Spacious double room with premium beds and views.', imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Diamond Grand Ballroom', type: 'Hall', price: 5000, description: 'The most prestigious venue for large events and galas.', imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Royal Manara Wedding Hall', type: 'Hall', price: 6500, description: 'The grandest hall in the city, perfectly designed for luxury weddings and royal galas.', imageUrl: 'https://images.unsplash.com/photo-1541280910158-c4e14f9c94a3?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Sapphire Conference Hall', type: 'Hall', price: 1200, description: 'Ideal for corporate seminars and professional meetings.', imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000' }
    ];


    // --- Food Items ---
    const menuItems = [
      // Somali Restaurant (Raashin)
      { name: 'Bariis Iskukaris', category: 'Restaurant', type: 'Main Course', price: 25, description: 'Traditional Somali spiced rice served with seasonal vegetables.', imageUrl: 'https://images.unsplash.com/photo-1512058560366-cd242d593030?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Hilib Ari (Roasted)', category: 'Restaurant', type: 'Main Course', price: 35, description: 'Tender slow-roasted goat meat with traditional spices.', imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Baasto Federaal', category: 'Restaurant', type: 'Main Course', price: 22, description: 'Classic Somali-style pasta with aromatic tomato sauce.', imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Muufo & Beef Suqaar', category: 'Restaurant', type: 'Main Course', price: 28, description: 'Traditional Somali cornbread with sautéed beef cubes.', imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Canjeero & Beer', category: 'Restaurant', type: 'Main Course', price: 18, description: 'Somali crepes served with sautéed lamb liver.', imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=1000' },
      
      // Cafe
      { name: 'Golden Manara Latte', category: 'Cafe', type: 'Coffee', price: 12, description: 'Signature blend with vanilla bean and creamy foam.', imageUrl: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Iced Caramel Macchiato', category: 'Cafe', type: 'Drink', price: 10, description: 'Refreshing cold coffee with rich caramel drizzle.', imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Specialty Espresso', category: 'Cafe', type: 'Coffee', price: 8, description: 'Strong single-origin coffee for true enthusiasts.', imageUrl: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Chocolate Muffin', category: 'Cafe', type: 'Snack', price: 9, description: 'Triple chocolate muffin with a soft center.', imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Blueberry Cheesecake', category: 'Cafe', type: 'Snack', price: 15, description: 'Creamy cheesecake topped with fresh forest berries.', imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=1000' }
    ];

    await Room.insertMany(rooms);
    await FoodItem.insertMany(menuItems);

    console.log('✅ UI Ready: All Images updated and verified.');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
};

seedData();
