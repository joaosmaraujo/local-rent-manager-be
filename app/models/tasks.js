const mongoose = require("../database/mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    anticipation: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;