const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/manara_plaza';

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  isConnected = true;
  console.log('✅ MongoDB Connected');
};

// Schemas
const roomSchema = new mongoose.Schema({
  name: String, type: String, roomType: String,
  price: Number, description: String, imageUrl: String,
  available: { type: Boolean, default: true }
});

const foodItemSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ['Restaurant', 'Cafe'] },
  type: String,
  price: Number, description: String, imageUrl: String
});

const orderSchema = new mongoose.Schema({
  customerName: String, phone: String, items: Array,
  totalPrice: Number,
  serviceType: { type: String, enum: ['Hotel', 'Restaurant', 'Cafe', 'Event'] },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
const FoodItem = mongoose.models.FoodItem || mongoose.model('FoodItem', foodItemSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

// Routes
app.get('/api/rooms', async (req, res) => {
  await connectDB();
  const rooms = await Room.find();
  res.json(rooms);
});

app.get('/api/menu', async (req, res) => {
  await connectDB();
  const menu = await FoodItem.find();
  res.json(menu);
});

app.get('/api/orders', async (req, res) => {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

app.post('/api/orders', async (req, res) => {
  await connectDB();
  const newOrder = new Order(req.body);
  const saved = await newOrder.save();
  res.status(201).json(saved);
});

app.get('/api', (req, res) => res.send('🏢 Manara Plaza API Running'));

module.exports = app;
