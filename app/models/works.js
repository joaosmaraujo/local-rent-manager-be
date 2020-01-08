const mongoose = require("../database/mongoose");

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

const Work = mongoose.model("Work", WorkSchema);

module.exports = Work;