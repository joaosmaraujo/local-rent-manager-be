const router = require("express").Router();
const passport = require('passport');
const WorkController = require('../controllers/works');
const controller = new WorkController();

/**
 * @api {post} /api/works AddWork
 * @apiVersion 1.0.0
 * @apiGroup Work
 * @apiName AddWork
 * @apiDescription Adds New Work
 *
 * @apiParam (Request body) {String} name work name
 * @apiParam (Request body) {String} frequency the frequency which the work must be done with
 * @apiParam (Request body) {Number} advance the advance in relation to a booking which the work must be done
 *
 * @apiSuccess (Success 200) {String} message Added record.
 * @apiSuccess (Success 200) {Object} content Object containing information about the work
 * @apiSuccess (Success 200) {Number} status The status code
 * @apiSuccess (Success 200) {Boolean} success Indicates the success of the request
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      {
 *          name: "Added record",
 *          content: {
 *              name: "task name",
 *              frequency: "monthly",
 *              advance: 7
 *          },
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
 * @apiError (Error 400) {String} Error Could not add record.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not add record."
 *     }
 * 
 */
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);

/**
 * @api {get} /api/tasks/ GetWorks
 * @apiVersion 1.0.0
 * @apiGroup Work
 * @apiName GetWorks
 * @apiDescription Gets All Works
 * @apiPermission authenticated user
 *
 * @apiSuccess (Success 200) {Array} works Array containing all works.
 * @apiSuccess (Success 200) {Object} work Object containing info about the work.
 * @apiSuccess (Success 200) {String} work.name work name
 * @apiSuccess (Success 200) {String} work.frequency the frequency which the work must be done with
 * @apiSuccess (Success 200) {Number} work.advance the advance in relation to a booking which the work must be done
 * 
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
 *          name: "work name",
 *          frequency: "monthly",
 *          advance: 7,
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
 * @api {get} /api/works/:id GetWork
 * @apiVersion 1.0.0
 * @apiGroup Work
 * @apiName GetWork
 * @apiDescription Gets Work
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the work _id
 *
 * @apiSuccess (Success 200) {Object} work Object containing info about the work.
 * @apiSuccess (Success 200) {String} work.name work name
 * @apiSuccess (Success 200) {String} work.frequency the frequency which the work must be done with
 * @apiSuccess (Success 200) {Number} work.advance the advance in relation to a booking which the work must be done
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          name: "work name",
 *          frequency: "monthly",
 *          advance: 7,
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
 * @apiError (Error 400) {String} Error Could not get record.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not get record."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not get record.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not get record. Cannot find id ..."
 *     }
 * 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);

/**
 * @api {put} /api/works/:id UpdateWork
 * @apiVersion 1.0.0
 * @apiGroup Work
 * @apiName UpdateWork
 * @apiDescription Updates Work
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the work _id
 * @apiParam (Request body) {String} name work name
 * @apiParam (Request body) {String} frequency the frequency which the work must be done with
 * @apiParam (Request body) {Number} advance the advance in relation to a booking which the work must be done
 *
 * @apiSuccess (Success 200) {String} message Record is now updated.
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
 * @apiError (Error 400) {String} Error Could not edit record.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not edit record."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not edit record.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not edit record. Cannot find id ..."
 *     }
 * 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);

/**
 * @api {delete} /api/works/:id DeleteWork
 * @apiVersion 1.0.0
 * @apiGroup Work
 * @apiName DeleteWork
 * @apiDescription Removes Work
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

module.exports = app => app.use("/works", router);