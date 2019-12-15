const mongoose = require("../database/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const HouseSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    ownerId: {
        type: ObjectId,
        ref: 'Customer',
        required: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const House = mongoose.model("House", HouseSchema);

module.exports = House;