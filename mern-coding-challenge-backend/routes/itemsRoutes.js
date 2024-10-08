// routes/itemsRoutes.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Endpoint to get items (you can modify the query as needed)
router.get('/', async (req, res) => {
  try {
    const items = await Transaction.find(); // Fetch all transactions
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
