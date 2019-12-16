const router = require("express").Router();
const House = require("../models/houses");
const HouseController = require('../controllers/houses');
const controller = new HouseController(House);
//const auth = require("../middlewares/auth.middleware");

router.post('/', controller.add);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = app => app.use("/houses", router);