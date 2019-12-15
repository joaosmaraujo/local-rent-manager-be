const mongoose = require("../database/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const TaskRegistrySchema = new mongoose.Schema({
    houseId: {
        type: ObjectId,
        ref: 'House',
        required: true
    },
    taskId: {
        type: ObjectId,
        ref: 'Task',
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    toBeDoneAt: {
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

const TaskRegistry = mongoose.model("TaskRegistry", TaskRegistrySchema);

module.exports = TaskRegistry;