// routes/statisticsRoutes.js

const express = require('express');
const router = express.Router();
const { getStatistics } = require('../controllers/statisticsController');
const path = require('path');

// Route to get statistics data and save to JSON file
router.get('/statistics', getStatistics);

// Route to serve the JSON file
router.get('/statistics/file', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'statistics.json');
  res.sendFile(filePath);
});

module.exports = router;
