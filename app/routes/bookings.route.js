const router = require("express").Router();
const Booking = require("../models/bookings");
const BookingController = require('../controllers/bookings');
const controller = new BookingController(Booking);
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), controller.add);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = app => app.use("/bookings", router);