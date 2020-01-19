const mongoose = require("../database/mongoose.js");
const ObjectId = mongoose.Schema.Types.ObjectId;
const House = require("../models/houses");

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

CustomerSchema.pre('remove', function(next) {
    House.remove({ customer: this._id }).exec();
    next();
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;