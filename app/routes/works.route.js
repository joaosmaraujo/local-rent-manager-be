const router = require("express").Router();
const passport = require('passport');
const Work = require("../models/works");
const WorkController = require('../controllers/works');
const controller = new WorkController(Work);

router.post('/', passport.authenticate('jwt', { session: false }), controller.add);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = app => app.use("/works", router);