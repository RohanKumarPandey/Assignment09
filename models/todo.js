const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    todoId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo