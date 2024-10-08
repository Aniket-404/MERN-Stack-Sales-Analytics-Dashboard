// controllers/statisticsController.js

const fs = require('fs');
const path = require('path');
const Transaction = require('../models/Transaction');

// Helper function to convert month number to month name
const getMonthName = (monthNumber) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[monthNumber - 1]; // Adjusting for zero-based index
};

const getStatistics = async (req, res) => {
  try {
    // Grouping transactions by month and calculating total sales and counts
    const statistics = await Transaction.aggregate([
      {
        $group: {
          _id: { $month: "$dateOfSale" },
          totalSales: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } },
          totalSold: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalNotSold: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
        },
      },
      {
        $project: {
          month: "$_id",
          totalSales: 1,
          totalSold: 1,
          totalNotSold: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    // Return statistics as an object keyed by month name for easier access
    const statisticsByMonth = {};
    statistics.forEach(stat => {
      const monthName = getMonthName(stat.month); // Convert month number to name
      statisticsByMonth[monthName] = {
        totalSales: stat.totalSales,
        totalSold: stat.totalSold,
        totalNotSold: stat.totalNotSold,
      };
    });

    // Save the statistics in a file
    const filePath = path.join(__dirname, '..', 'data', 'statistics.json');
    fs.writeFileSync(filePath, JSON.stringify(statisticsByMonth, null, 2));

    // Respond with the statistics file content
    res.json(statisticsByMonth);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getStatistics };
