const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;

    if (
      !month ||
      !/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i.test(month)
    ) {
      return res.status(400).json({ message: 'Invalid or missing month parameter' });
    }

    const monthNumber = new Date(`${month} 1, 2020`).getMonth() + 1;

    const filter = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
    };

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ];

      if (!isNaN(search)) {
        filter.$or.push({ price: Number(search) });
      }
    }

    const total = await Transaction.countDocuments(filter);

    const transactions = await Transaction.find(filter)
      .skip((Number(page) - 1) * Number(perPage))
      .limit(Number(perPage))
      .sort({ dateOfSale: -1 }); 

    let totalSales = 0;
    let totalSoldItems = 0;
    let totalNotSoldItems = 0;

    transactions.forEach(transaction => {
      const price = transaction.price; 
      const isSold = transaction.sold; 

      console.log(`Processing transaction: ${JSON.stringify(transaction)}`);

      if (typeof price === 'number' && !isNaN(price)) {
        totalSales += price;
      }

      if (isSold) {
        totalSoldItems++;
      } else {
        totalNotSoldItems++;
      }
    });

    console.log(`Total Sales: ${totalSales}, Total Sold Items: ${totalSoldItems}, Total Not Sold Items: ${totalNotSoldItems}`);

    res.status(200).json({
      total,
      page: Number(page),
      perPage: Number(perPage),
      transactions,
      totalSales: totalSales.toFixed(2), 
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

module.exports = { listTransactions };
