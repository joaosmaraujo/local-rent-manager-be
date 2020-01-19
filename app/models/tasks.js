const mongoose = require("../database/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const TaskSchema = new mongoose.Schema({
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
    createAt: {
        type: Date,
        default: Date.now()
    }
});



TaskSchema.pre('remove', async function() {
    const House = require("../models/houses");
    await House.updateMany(
        { tasks: this._id },
        { $pull: { tasks: this._id } },
        { multi: true })
    .exec()
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;