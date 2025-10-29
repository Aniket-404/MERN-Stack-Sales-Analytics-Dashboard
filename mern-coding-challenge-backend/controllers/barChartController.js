const Transaction = require('../models/Transaction');

const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    if (!month || !/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i.test(month)) {
      return res.status(400).json({ message: 'Invalid or missing month parameter' });
    }

    const monthNumber = new Date(`${month} 1, 2022`).getMonth() + 1;

    const filter = {
      dateOfSale: {
        $gte: new Date(`2022-${monthNumber.toString().padStart(2, '0')}-01`),
        $lt: new Date(`2022-${(monthNumber + 1).toString().padStart(2, '0')}-01`),
      },
    };

    const priceBuckets = [
      { label: '0-100', min: 0, max: 100 },
      { label: '101-200', min: 101, max: 200 },
      { label: '201-300', min: 201, max: 300 },
      { label: '301-400', min: 301, max: 400 },
      { label: '401-500', min: 401, max: 500 },
      { label: '501-600', min: 501, max: 600 },
      { label: '601-700', min: 601, max: 700 },
      { label: '701-800', min: 701, max: 800 },
      { label: '801-900', min: 801, max: 900 },
      { label: '901-above', min: 901, max: Number.MAX_SAFE_INTEGER },
    ];

    const counts = {};
    priceBuckets.forEach((bucket) => {
      counts[bucket.label] = 0;
    });

    const transactions = await Transaction.find(filter).select('price');

    transactions.forEach((tx) => {
      const price = tx.price;
      const bucket = priceBuckets.find((b) => price >= b.min && price <= b.max);
      if (bucket) {
        counts[bucket.label]++;
      }
    });

    const barChartData = Object.keys(counts).map((label) => ({
      label,
      count: counts[label],
    }));

    res.json(barChartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getBarChartData };
