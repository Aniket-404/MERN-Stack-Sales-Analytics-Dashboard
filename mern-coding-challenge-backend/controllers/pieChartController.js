// controllers/pieChartController.js

const Transaction = require('../models/Transaction');

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    // Validate month
    if (!month || !/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i.test(month)) {
      return res.status(400).json({ message: 'Invalid or missing month parameter' });
    }

    const monthNumber = new Date(`${month} 1, 2020`).getMonth();

    // Calculate the start and end of the month
    const startDate = new Date(2020, monthNumber, 1);
    const endDate = new Date(2020, monthNumber + 1, 0); // Last day of the month

    // Fetch transactions within the specified month
    const transactions = await Transaction.find({
      dateOfSale: {
        $gte: startDate,
        $lt: endDate
      }
    });

    // Initialize counts
    const categoryCounts = {};

    // Count each transaction in its category
    transactions.forEach(tx => {
      const category = tx.category; // Assuming your Transaction model has a category field
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    // Prepare the pie chart data
    const pieChartData = Object.keys(categoryCounts).map(category => ({
      category,
      count: categoryCounts[category]
    }));

    res.json(pieChartData);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getPieChartData };
