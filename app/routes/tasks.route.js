const router = require("express").Router();
const Task = require("../models/tasks");
const TaskController = require('../controllers/tasks');
const controller = new TaskController(Task);
//const auth = require("../middlewares/auth.middleware");

router.post('/', controller.add);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = app => app.use("/tasks", router);