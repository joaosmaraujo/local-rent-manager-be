const mongoose = require("../database/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const House = require("../models/houses");

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

TaskSchema.pre('remove', function(next) {
    House.update(
        { tasks : this._id}, 
        { $pull: { tasks: this._id } },
        { multi: true })  //if reference exists in multiple documents 
    .exec();
    next();
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;