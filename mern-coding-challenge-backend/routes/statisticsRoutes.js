const express = require('express');
const router = express.Router();
const { getStatistics } = require('../controllers/statisticsController');
const path = require('path');

router.get('/statistics', getStatistics);

router.get('/statistics/file', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'statistics.json');
  res.sendFile(filePath);
});

module.exports = router;
