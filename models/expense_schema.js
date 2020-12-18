const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    expense: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    }
}, {collection: 'expenses'})

module.exports = mongoose.model('ExpenseSchema', expenseSchema)