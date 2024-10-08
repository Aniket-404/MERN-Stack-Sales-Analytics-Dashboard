const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  dateOfSale: { type: Date, required: true },
  sold: { type: Boolean, default: false },
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
