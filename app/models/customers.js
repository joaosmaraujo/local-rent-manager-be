const mongoose = require("../database/mongoose.js");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    houses: [{ type: ObjectId, ref: 'House' }],
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;