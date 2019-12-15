const router = require("express").Router();
const TaskRegistry = require("../models/tasks_registries");
const TaskRegistryController = require('../controllers/tasks_registries');
const controller = new TaskRegistryController(TaskRegistry);
//const auth = require("../middlewares/auth.middleware");

router.post('/', controller.add);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = app => app.use("/tasks-registries", router);