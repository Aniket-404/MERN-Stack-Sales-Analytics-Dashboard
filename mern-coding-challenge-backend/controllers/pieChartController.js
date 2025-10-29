const Transaction = require('../models/Transaction');

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || !/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i.test(month)) {
      return res.status(400).json({ message: 'Invalid or missing month parameter' });
    }

    const monthNumber = new Date(`${month} 1, 2022`).getMonth();

    const startDate = new Date(2022, monthNumber, 1);
    const endDate = new Date(2022, monthNumber + 1, 0);

    const transactions = await Transaction.find({
      dateOfSale: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const categoryCounts = {};

    transactions.forEach(tx => {
      const category = tx.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

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
