const mongoose = require("../database/mongoose");
const Task = require("../models/tasks");

const WorkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    advance: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

WorkSchema.pre('remove', async function() {
    await Task.deleteMany({ work: this._id }).exec();
});

const Work = mongoose.model("Work", WorkSchema);

module.exports = Work;