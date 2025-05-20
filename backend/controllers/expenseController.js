const User = require('../models/User');
const xlsx = require('xlsx')
const Expense = require('../models/Expense');



//add expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try{
        const { icon, category, amount, date} = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({ message: "Vui lòng điền đủ thông tin"})
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (err){
        res.status(500).json({message: "sever error"})
    }
}

//get all Expense
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({ date: -1});
        res.json(expense);
    } catch(err) {
        res.status(500).json({message: "sever error"})
    }
}

//delete Expense
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Đã xóa Thành công"})
    } catch (err){
        res.status(500).json({message: "sever error"})
    }
}

//dowload Expense
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({ date: -1});

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_detail.xlsx');
        res.download('expense_detail.xlsx');
    } catch(err){
        res.status(500).json({message: "sever error"})
    }
}
