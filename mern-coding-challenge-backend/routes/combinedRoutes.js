const express = require('express');
const router = express.Router();
const { getCombinedData } = require('../controllers/combinedController');

router.get('/combined-data', getCombinedData);

module.exports = router;
