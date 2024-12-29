const mongoose = require('mongoose');

// angsuransi
const installmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  nominal: { type: Number, required: true },
  installmentNumber: { type: Number, required: true }
});

// Operational Expense Sub-schema
const operationalExpenseSchema = new mongoose.Schema({
  information: String,
  transactionDate: { type: Date, required: true },
  nominal: { type: Number, required: true },
  category: { type: String, enum: ['biaya administrasi', 'operasional usaha', 'biaya umum'], required: true },
  additionalInformation: String
});

// Member Loan Sub-schema
const memberLoanSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true }, // Referensi ke member
  borrowingDate: { type: Date, required: true, default: Date.now },
  dueDate: { type: Date, required: true },
  nominal: { type: Number, required: true },
  status: { type: String, enum: ['belum lunas', 'lunas'], default: 'belum lunas' },
  installments: [installmentSchema]
});

// Other Expense Sub-schema
const otherExpenseSchema = new mongoose.Schema({
  expenseType: { type: String, enum: ['biaya investasi', 'biaya tak terduga', 'biaya sosial dan budaya', 'biaya pajak dan retribusi'], required: true },
  date: { type: Date, required: true },
  nominal: { type: Number, required: true },
  recipient: String,
  file: String // Assuming it's a path or URL to the file
});

// Main Expense Schema
const expenseSchema = new mongoose.Schema({
  type: { type: String, enum: ['operational', 'memberLoan', 'otherExpense'], required: true },
  operational: operationalExpenseSchema,
  memberLoan: memberLoanSchema,
  otherExpense: otherExpenseSchema
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
