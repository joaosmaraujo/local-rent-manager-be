const mongoose = require("../database/mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    counters: {
        tasks: { type: Number, default: 0 },
        checkIns: { type: Number, default: 0 },
        checkOuts: { type: Number, default: 0 }
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;