const mongoose = require('mongoose');

// Sale Sub-schema
const saleSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  dateTransaction: { type: Date, required: true },
  description: String,
  category: { type: String, enum: ['sembako', 'produk olahan'], required: true },
  nominal: { type: Number, required: true }
});

// Saving Sub-schema
const savingSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true }, // Referensi ke member
  depositDate: { type: Date, required: true, default: Date.now },
  principalDeposit: { type: Number, required: true },
  mandatoryDeposit: { type: Number, required: true },
  voluntaryDeposit: Number
});

// Other Income Sub-schema
const otherIncomeSchema = new mongoose.Schema({
  incomeType: { type: String, enum: ['bantuan', 'denda', 'investasi'], required: true },
  date: { type: Date, required: true },
  nominal: { type: Number, required: true },
  incomeSource: String,
  file: String // Assuming it's a path or URL to the file
});

// Main Income Schema
const incomeSchema = new mongoose.Schema({
  type: { type: String, enum: ['sale', 'saving', 'otherIncome'], required: true },
  sale: saleSchema,
  saving: savingSchema,
  otherIncome: otherIncomeSchema
});

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
