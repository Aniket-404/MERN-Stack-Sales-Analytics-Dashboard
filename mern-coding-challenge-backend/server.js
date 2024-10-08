// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Add this to serve static files
require('dotenv').config();

// Import Routes
const seedRoutes = require('./routes/seedRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const barChartRoutes = require('./routes/barChartRoutes');
const pieChartRoutes = require('./routes/pieChartRoutes');
const combinedRoutes = require('./routes/combinedRoutes');
const itemsRoutes = require('./routes/itemsRoutes'); // Added for handling the '/api/items' endpoint

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_coding_challenge', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api', seedRoutes);
app.use('/api', transactionRoutes);
app.use('/api', statisticsRoutes);
app.use('/api', barChartRoutes);
app.use('/api', pieChartRoutes);
app.use('/api', combinedRoutes);
app.use('/api/items', itemsRoutes); // Route added for fetching items

// Serve static files like the statistics JSON file
app.use('/data', express.static(path.join(__dirname, 'data')));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
