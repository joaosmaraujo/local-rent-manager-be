const router = require("express").Router();
const passport = require('passport');
const Work = require("../models/works");
const WorkController = require('../controllers/works');
const controller = new WorkController(Work);
//const auth = require("../middlewares/auth.middleware");

router.post('/', controller.add);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = app => app.use("/works", router);