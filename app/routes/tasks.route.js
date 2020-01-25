const router = require("express").Router();
const Task = require("../models/tasks");
const TaskController = require('../controllers/tasks');
const controller = new TaskController(Task);
const passport = require('passport');

/**
    * @api {post} /api/tasks Adds a task
    * @apiVersion 1.0.0
    * @apiName Add
    * @apiGroup Task
    * @apiPermission authenticated user
    *
    * @apiParam (Request body) {Object} task The task object
    *
    * @apiSuccess (Success 201) {String} message Task saved successfully!
    * @apiSuccess (Success 201) {String} id The campaign id
    *
    * @apiSuccessExample {json} Success response:
    *     HTTPS 200 OK
    *     {
    *       "name": "Added task",
    *       "task": {
    *       }
    *       "status": 200,
    *       "success": true
    *     }
    *
    * @apiError TaskNotAdded.
    *
    * @apiErrorExample Error-Response:
    *     HTTP 400 Not Found
    *     {
    *       "error": "Could not add task."
    *     }
*/
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = app => app.use("/tasks", router);