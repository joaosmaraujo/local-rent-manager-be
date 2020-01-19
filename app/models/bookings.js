const mongoose = require("../database/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const BookingSchema = new mongoose.Schema({
    guestFirstName: {
        type: String,
        required: true
    },
    guestLastName: {
        type: String,
        required: true
    },
    house: {
        type: ObjectId,
        ref: 'House',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

BookingSchema.pre('remove', function(next) {
    House.update(
        { bookings : this._id}, 
        { $pull: { bookings: this._id } },
        { multi: true })  //if reference exists in multiple documents 
    .exec();
    next();
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;