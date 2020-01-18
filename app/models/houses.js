const mongoose = require("../database/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

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

const House = mongoose.model("House", HouseSchema);

module.exports = House;