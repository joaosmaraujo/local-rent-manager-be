const router = require("express").Router();
const passport = require('passport');
const House = require("../models/houses");
const HouseController = require('../controllers/houses');
const controller = new HouseController(House);

router.post('/', passport.authenticate('jwt', { session: false }), controller.add);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = app => app.use("/houses", router);