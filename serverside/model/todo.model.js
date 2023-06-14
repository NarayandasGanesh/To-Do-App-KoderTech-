const mongoose = require("mongoose")

// Schema

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    task: String,
    date: {type:String, default: new Date()},
    is_completed: Boolean
})

//Model

module.exports = mongoose.model("todo",todoSchema)