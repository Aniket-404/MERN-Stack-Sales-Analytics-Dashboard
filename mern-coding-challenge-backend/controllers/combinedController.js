const axios = require('axios');

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month parameter is required' });
    }

    const baseUrl = `${process.env.BASE_URL || 'http://localhost:5000/api'}`;

    const [statisticsRes, barChartRes, pieChartRes] = await Promise.all([
      axios.get(`${baseUrl}/statistics`, { params: { month } }),
      axios.get(`${baseUrl}/bar-chart`, { params: { month } }),
      axios.get(`${baseUrl}/pie-chart`, { params: { month } })
    ]);

    res.status(200).json({
      statistics: statisticsRes.data,
      barChart: barChartRes.data,
      pieChart: pieChartRes.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching combined data', error: error.message });
  }
};

module.exports = { getCombinedData };
