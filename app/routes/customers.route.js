const router = require("express").Router();
const passport = require('passport');
const Customer = require("../models/customers");
const CustomerController = require('../controllers/customers');
const controller = new CustomerController(Customer);
//const auth = require("../middlewares/auth.middleware");

router.post('/', controller.add);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = app => app.use("/customers", router);