const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/manara_plaza';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Manara Plaza Connected to MongoDB'))
  .catch(err => console.error('❌ Connection Error:', err));

// Schemas
const roomSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  description: String,
  imageUrl: String,
  available: { type: Boolean, default: true },
  roomType: String 
});

const foodItemSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ['Restaurant', 'Cafe'] },
  price: Number,
  description: String,
  imageUrl: String
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
  stock: Number
});

const orderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  items: Array,
  totalPrice: Number,
  serviceType: { type: String, enum: ['Hotel', 'Restaurant', 'Cafe', 'Shop', 'Event'] },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', roomSchema);
const FoodItem = mongoose.model('FoodItem', foodItemSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// API Routes

// Hotel & Halls (Rooms)
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Restaurant & Cafe (Menu)
app.get('/api/menu', async (req, res) => {
  try {
    const menu = await FoodItem.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Shop (Products)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Orders & Bookings
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Default Route
app.get('/', (req, res) => {
  res.send('🏢 Manara Plaza API is Running...');
});

// Local server listening (Optional for serverless, but kept for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Manara Plaza Server Running on port ${PORT}`);
  });
}

module.exports = app;
