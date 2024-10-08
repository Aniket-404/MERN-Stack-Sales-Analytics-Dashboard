const axios = require('axios');
const Transaction = require('../models/Transaction');

const seedDatabase = async (req, res) => {
  try {
    // Fetch data from third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    // Check if data is an array; if not, wrap it into an array
    const transactionsData = Array.isArray(data) ? data : [data];

    console.log(`Fetched ${transactionsData.length} transactions from the API.`);

    // Clear existing data
    await Transaction.deleteMany({});
    console.log('Cleared existing transactions in the database.');

    // Seed database
    const transactions = transactionsData.map(item => ({
      title: item.title,
      description: item.description,
      price: parseFloat(item.price),
      category: item.category,
      dateOfSale: new Date(item.dateOfSale),
      sold: item.sold,
      image: item.image,
    }));

    const inserted = await Transaction.insertMany(transactions);
    console.log(`Inserted ${inserted.length} transactions into the database.`);

    res.status(200).json({ message: 'Database seeded successfully', count: inserted.length });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
};

module.exports = { seedDatabase };
