const mongoose = require("../database/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Task = require("../models/tasks");
const Booking = require("../models/bookings");
const Customer = require("../models/customers");

const HouseSchema = new mongoose.Schema({
    label : {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'Customer',
        required: true
    },
    tasks: [{ type: ObjectId, ref: 'Task' }],
    bookings: [{ type: ObjectId, ref: 'Booking' }],
    createAt: {
        type: Date,
        default: Date.now()
    }
});

HouseSchema.pre('remove', async function() {
    await Task.deleteMany({ house: this._id }).exec();
    await Booking.deleteMany({ house: this._id}).exec();
    await Customer.updateMany(
        { houses: this._id },
        { $pull: { houses: this._id } },
        { multi: true })  //if reference exists in multiple documents 
    .exec();
});

const House = mongoose.model("House", HouseSchema);

module.exports = House;