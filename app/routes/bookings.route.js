const router = require("express").Router();
const Booking = require("../models/bookings");
const BookingController = require('../controllers/bookings');
const controller = new BookingController(Booking);
//const auth = require("../middlewares/auth.middleware");

router.post('/', controller.add);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = app => app.use("/bookings", router);