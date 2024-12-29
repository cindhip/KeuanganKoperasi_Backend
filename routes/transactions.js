const memberController = require("../controllers/member");
const incomeController = require("../controllers/income");
const expenseController = require("../controllers/expense");
const { getAdmin } = require("../controllers/admin");
const { login } = require("../controllers/login");

const router = require("express").Router();

router
  .post("/member", memberController.createMember)
  .get("/member", memberController.getAllMembers)
  .get("/member/:id", memberController.getMemberById)
  .put("/member/:id", memberController.updateMemberById)
  .put("/member/:id/saving", memberController.updateMemberSavingsById)
  .put("/member/:id/loans", memberController.updateMemberLoansById)
  .delete("/member/:id", memberController.deleteMemberById)
  .delete("/member/:id/saving", memberController.deleteMemberSavingsById)

  .post("/income", incomeController.createIncome)
  .get("/income", incomeController.getAllIncomes)
  .get("/income/:id", incomeController.getIncomeById)
  .put("/income/:id", incomeController.updateIncomeById)
  .delete("/income/:id", incomeController.deleteIncomeById)

  .post("/expense", expenseController.createExpense)
  .get("/expense", expenseController.getAllExpenses)
  .get("/expense/:id", expenseController.getExpenseById)
  .put("/expense/:id", expenseController.updateExpenseById)
  .put("/expense/:id/installment", expenseController.updateInstallmentById)
  .delete("/expense/:id", expenseController.deleteExpenseById)

  .post("/login", login)
  .get("/admin", getAdmin);
module.exports = router;
