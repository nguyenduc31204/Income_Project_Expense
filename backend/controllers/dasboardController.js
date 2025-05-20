const Income = require("../models/Income")
const Expense = require("../models/Expense")
const { isValidObjectId, Types } = require("mongoose")

//dashboard
exports.getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userOcjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userOcjectId } },
            { $group: { _id: null, total: { $sum: "$amount"}}},
        ])


        const totalExpense = await Expense.aggregate([
            { $match: { userId: userOcjectId } },
            { $group: { _id: null, total: { $sum: "$amount"}}},
        ])

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 *24 * 60 * 60 * 100)},
        }).sort({ date: -1 })

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 100)},
        }).sort({ date: -1 });

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )


        const lastTransactions = [
            ...(await Income.find({userId}).sort({ date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({userId}).sort({ date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date)

        res.json ({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            las30DaysExpenses: {
                total: expensesLast30Days,
                transaction: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransactions
            },
            recentTransactions: lastTransactions,
        });
    } catch(e){
        res.status(500).json({message: "server error"});
    }
}