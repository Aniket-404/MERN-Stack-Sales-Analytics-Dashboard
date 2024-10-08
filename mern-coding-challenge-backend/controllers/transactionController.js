const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;

    // Validate month
    if (
      !month ||
      !/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i.test(month)
    ) {
      return res.status(400).json({ message: 'Invalid or missing month parameter' });
    }

    // Convert month to number (1-12)
    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

    // Build filter for month
    const filter = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    };

    // Build search filter
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ];

      // If search is a valid number, include price in search
      if (!isNaN(search)) {
        filter.$or.push({ price: Number(search) });
      }
    }

    // Count total matching documents
    const total = await Transaction.countDocuments(filter);

    // Fetch transactions with pagination
    const transactions = await Transaction.find(filter)
      .skip((Number(page) - 1) * Number(perPage))
      .limit(Number(perPage))
      .sort({ dateOfSale: -1 }); // Optional: Sort by dateOfSale descending

    // Calculate totals for sales and items
    let totalSales = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    transactions.forEach(transaction => {
      const price = transaction.price; // Assuming price is a number
      const isSold = transaction.sold; // Using the correct field for sold status

      // Log the values being processed
      console.log(`Processing transaction: ${JSON.stringify(transaction)}`);

      // Check if price is a valid number
      if (typeof price === 'number' && !isNaN(price)) {
        totalSales += price;
      }

      // Count sold and not sold items
      if (isSold) {
        totalSoldItems++;
      } else {
        totalNotSoldItems++;
      }
    });

    // Log final totals
    console.log(`Total Sales: ${totalSales}, Total Sold Items: ${totalSoldItems}, Total Not Sold Items: ${totalNotSoldItems}`);

    res.status(200).json({
      total,
      page: Number(page),
      perPage: Number(perPage),
      transactions,
      totalSales: totalSales.toFixed(2), // Format to 2 decimal places
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

module.exports = { listTransactions };
