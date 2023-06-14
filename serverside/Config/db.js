const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb+srv://ganesh:ganesh@cluster0.t7uafyo.mongodb.net/todo?retryWrites=true&w=majority")

module.exports = connection