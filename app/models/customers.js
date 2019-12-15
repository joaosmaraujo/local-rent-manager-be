const mongoose = require("../database/mongoose.js");
;
const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;