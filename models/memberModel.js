const mongoose = require("mongoose");
const Expense = require("./expenseModel");
const Income = require("./incomeModel");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
  address: String,
  phone: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  memberNumber: { type: Number, unique: true }, // Auto-generate
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }], // referensi untuk pinjaman
  savings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }], // referensi untuk tabungan
});

module.exports = mongoose.model("Member", memberSchema);
