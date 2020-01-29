const router = require("express").Router();
const TaskController = require('../controllers/tasks');
const controller = new TaskController();
const passport = require('passport');

/**
 * @api {post} /api/tasks AddTask
 * @apiVersion 1.0.0
 * @apiGroup Task
 * @apiName AddTask
 * @apiDescription Adds New Task
 *
 * @apiParam (Request body) {Number} cost cost of the task
 * @apiParam (Request body) {Boolean} completed indicates if the user is completed
 * @apiParam (Request body) {String} completedBy the id of the user who completed the task
 * @apiParam (Request body) {String} house the id of the house where the task shall be done
 * @apiParam (Request body) {String} work the id of the work that shall be done
 *
 * @apiSuccess (Success 200) {String} message Added task.
 * @apiSuccess (Success 200) {Object} content Object containing information about the task
 * @apiSuccess (Success 200) {Number} status The status code
 * @apiSuccess (Success 200) {Boolean} success Indicates the success of the request
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      {
 *          name: "Added task",
 *          content: { task },
 *          status: 200,
 *          success: true
 *      }
 * 
 * @apiError (Error 401) {String} Unauthorized Only authenticated users can access the endpoint.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 401 Not Found
 *     {
 *       "error": "Only authenticated users can access the endpoint."
 *     }
 *
 * @apiError (Error 400) {String} Error Could not add task.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not add task."
 *     }
 * 
 */
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);

/**
 * @api {get} /api/tasks/ GetTasks
 * @apiVersion 1.0.0
 * @apiGroup Task
 * @apiName GetTasks
 * @apiDescription Gets All Tasks
 * @apiPermission authenticated user
 *
 * @apiSuccess (Success 200) {Array} tasks Array containing all tasks.
 * @apiSuccess (Success 200) {Object} task Object containing info about the task.
 * @apiSuccess (Success 200) {String} task._id task id
 * @apiSuccess (Success 200) {Number} task.cost cost of the task
 * @apiSuccess (Success 200) {Boolean} task.completed indicates if the user is completed
 * @apiSuccess (Success 200) {String} task.completedBy the id of the user who completed the task
 * @apiSuccess (Success 200) {String} task.house the id of the house where the task shall be done
 * @apiSuccess (Success 200) {String} task.work the id of the work that shall be done
 * 
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
 *          cost: 10,
 *          deadline: '2020-10-09',
 *          completed: false,
 *          completedBy: '112323k13k1p3k',
 *          house: 'adsa21983103ap',
 *          work: '1223io1jdakld',
 *          createdAt: '2020-01-30'
 *      }]
 * 
 * @apiError (Error 401) {String} Unauthorized Only authenticated users can access the endpoint.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 401 Not Found
 *     {
 *       "error": "Only authenticated users can access the endpoint."
 *     }
 *
 * @apiError (Error 400) {String} Error Failed to connect to DB.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Failed to connect to DB."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Failed to retrieve records
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Failed to retrieve records"
 *     }
 * 
 */
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

/**
 * @api {get} /api/tasks/:id GetTask
 * @apiVersion 1.0.0
 * @apiGroup Task
 * @apiName GetTask
 * @apiDescription Gets Task
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the task _id
 *
 * @apiSuccess (Success 200) {Object} task Object containing info about the task.
 * @apiSuccess (Success 200) {String} task._id task id
 * @apiSuccess (Success 200) {Number} task.cost cost of the task
 * @apiSuccess (Success 200) {Boolean} task.completed indicates if the user is completed
 * @apiSuccess (Success 200) {String} task.completedBy the id of the user who completed the task
 * @apiSuccess (Success 200) {String} task.house the id of the house where the task shall be done
 * @apiSuccess (Success 200) {String} task.work the id of the work that shall be done
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          cost: 10,
 *          deadline: '2020-10-09',
 *          completed: false,
 *          completedBy: '112323k13k1p3k',
 *          house: 'adsa21983103ap',
 *          work: '1223io1jdakld',
 *          createdAt: '2020-01-30'
 *      }
 * 
 * @apiError (Error 401) {String} Unauthorized Only authenticated users can access the endpoint.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 401 Not Found
 *     {
 *       "error": "Only authenticated users can access the endpoint."
 *     }
 *
 * @apiError (Error 400) {String} Error Could not get task.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not get task."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not get task.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not get task. Cannot find id ..."
 *     }
 * 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);

/**
 * @api {put} /api/tasks/:id UpdateTask
 * @apiVersion 1.0.0
 * @apiGroup Task
 * @apiName UpdateTask
 * @apiDescription Updates Task
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the task _id
 * @apiParam (Request body) {Number} cost cost of the task
 * @apiParam (Request body) {Boolean} completed indicates if the task is completed
 * @apiParam (Request body) {String} completedBy the id of the user who completed the task
 * @apiParam (Request body) {String} house the id of the house where the task shall be done
 * @apiParam (Request body) {String} work the id of the work that shall be done
 *
 * @apiSuccess (Success 200) {String} message Task is now updated.
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiError (Error 401) {String} Unauthorized Only authenticated users can access the endpoint.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 401 Not Found
 *     {
 *       "error": "Only authenticated users can access the endpoint."
 *     }
 * 
 * @apiError (Error 400) {String} Error Could not edit task.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not edit task."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not edit task.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not edit task. Cannot find id ..."
 *     }
 * 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);

/**
 * @api {delete} /api/tasks/:id DeleteTask
 * @apiVersion 1.0.0
 * @apiGroup Task
 * @apiName DeleteTask
 * @apiDescription Removes Task
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the task _id
 *
 * @apiSuccess (Success 200) {String} message Record was removed.
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *       "success": true,
 *       "msg": "Record was removed."
 *     }
 *
 * @apiError (Error 401) {String} Unauthorized Only authenticated users can access the endpoint.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 401 Not Found
 *     {
 *       "error": "Only authenticated users can access the endpoint."
 *     }
 * 
 * @apiError (Error 400) {String} Error Could not remove record.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not remove record."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not remove record.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not remove record. Cannot find id ..."
 *     }
 * 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = app => app.use("/tasks", router);