const router = require("express").Router();
const User = require("../models/houses");
const UserController = require('../controllers/houses');
const controller = new UserController(User);
//const auth = require("../middlewares/auth.middleware");

router.post('/', controller.add);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = app => app.use("/users", router);
