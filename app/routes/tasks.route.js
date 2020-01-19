const router = require("express").Router();
const Task = require("../models/tasks");
const TaskController = require('../controllers/tasks');
const controller = new TaskController(Task);
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), controller.add);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = app => app.use("/tasks", router);