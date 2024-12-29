const Expense = require("../models/expenseModel");

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("memberLoan.member");
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate(
      "memberLoan.member"
    );
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update expense by ID
exports.updateExpenseById = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update installment by ID
exports.updateInstallmentById = async (req, res) => {
  try {
    console.log(req.body); // log data untuk debug

    const { date, nominal, installmentNumber } = req.body;

    const updatedLoan = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          "memberLoan.installments": { date, nominal, installmentNumber },
        },
      },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Member loan not found" });
    }

    res.status(200).json(updatedLoan);
  } catch (error) {
    console.log(error); // log error untuk debug
    res.status(400).json({ message: error.message });
  }
};



// Delete expense by ID
exports.deleteExpenseById = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
