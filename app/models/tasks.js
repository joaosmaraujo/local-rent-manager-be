const mongoose = require("../database/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const TaskSchema = new mongoose.Schema({
    house: {
        type: ObjectId,
        ref: 'House',
        required: true
    },
    work: {
        type: ObjectId,
        ref: 'Work',
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;