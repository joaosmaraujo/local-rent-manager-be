const router = require("express").Router();
const passport = require('passport');
const HouseController = require('../controllers/houses');
const controller = new HouseController();

/**
 * @api {post} /api/houses AddHouse
 * @apiVersion 1.0.0
 * @apiGroup House
 * @apiName AddHouse
 * @apiDescription Adds New House
 *
 * @apiParam (Request body) {String} label label for the house
 * @apiParam (Request body) {String} type house type
 * @apiParam (Request body) {String} address house address
 * @apiParam (Request body) {String} city city where the house is located
 * @apiParam (Request body) {String} owner the id of the customer who owns the house
 *
 * @apiSuccess (Success 200) {String} message Added house.
 * @apiSuccess (Success 200) {Object} content Object containing information about the house
 * @apiSuccess (Success 200) {Number} status The status code
 * @apiSuccess (Success 200) {Boolean} success Indicates the success of the request
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      {
 *          name: "Added house",
 *          content: {
 *              label: "house label",
 *              type: "T3",
 *              address: "house address",
 *              city: "some city in Portugal",
 *              owner: "owner _id",
 *              createdAt: "2020-01-30"
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
 * @apiError (Error 400) {String} Error Could not add house.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not add house."
 *     }
 * 
 */
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);

/**
 * @api {get} /api/houses/ GetHouses
 * @apiVersion 1.0.0
 * @apiGroup House
 * @apiName GetHouses
 * @apiDescription Gets All Houses
 * @apiPermission authenticated user
 *
 * @apiSuccess (Success 200) {Array} houses Array containing all houses.
 * @apiSuccess (Success 200) {Object} house Object containing info about the house.
 * @apiSuccess (Success 200) {String} house._id house id
 * @apiSuccess (Success 200) {String} house.label house label
 * @apiSuccess (Success 200) {String} house.type house type
 * @apiSuccess (Success 200) {String} house.address house address
 * @apiSuccess (Success 200) {String} house.city city where the house is located
 * @apiSuccess (Success 200) {String} house.owner the id of the customer who owns the house
 * @apiSuccess (Success 200) {Array} house.tasks array of ids of tasks scheduled for the house
 * @apiSuccess (Success 200) {Array} house.bookings array of ids of bookins scheduled for the house
 * 
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
 *          label: "house label",
 *          type: "T3",
 *          address: "house address",
 *          city: "some city in Portugal",
 *          owner: "owner _id",
 *          tasks: [ tasks ids ],
 *          bookings: [ bookings ids ]
 *          createdAt: "2020-01-30"
 *     }]
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
 * @apiError (Error 404) {String} NotFound Failed to retrieve houses.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Failed to retrieve houses."
 *     }
 * 
 */
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

/**
 * @api {get} /api/houses/:id GetHouse
 * @apiVersion 1.0.0
 * @apiGroup House
 * @apiName GetHouse
 * @apiDescription Gets House
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the house _id
 *
 * @apiSuccess (Success 200) house Object containing info about the house.
 * @apiSuccess (Success 200) {String} house._id house id
 * @apiSuccess (Success 200) {String} house.label house label
 * @apiSuccess (Success 200) {String} house.type house type
 * @apiSuccess (Success 200) {String} house.address house address
 * @apiSuccess (Success 200) {String} house.city city where the house is located
 * @apiSuccess (Success 200) {String} house.owner the id of the customer who owns the house
 * @apiSuccess (Success 200) {Array} house.tasks array of ids of tasks scheduled for the house
 * @apiSuccess (Success 200) {Array} house.bookings array of ids of bookins scheduled for the house
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          label: "house label",
 *          type: "T3",
 *          address: "house address",
 *          city: "some city in Portugal",
 *          owner: "owner _id",
 *          tasks: [ tasks ids ],
 *          bookings: [ bookings ids ]
 *          createdAt: "2020-01-30"
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
 * @apiError (Error 400) {String} Error Could not get house.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not get house."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not get task.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not get house. Cannot find id ..."
 *     }
 * 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);

/**
 * @api {put} /api/houses/:id UpdateHouse
 * @apiVersion 1.0.0
 * @apiGroup House
 * @apiName UpdateHouse
 * @apiDescription Updates House
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the house _id
 * @apiParam (Request body) {Number} cost cost of the task
 * @apiParam (Request body) {Boolean} completed indicates if the user is completed
 * @apiParam (Request body) {String} completedBy the id of the user who completed the task
 * @apiParam (Request body) {String} house the id of the house where the task shall be done
 * @apiParam (Request body) {String} work the id of the work that shall be done
 *
 * @apiSuccess (Success 200) {String} message House is now updated.
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
 * @apiError (Error 400) {String} Error Could not edit house.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not edit task."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not edit house.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not edit house. Cannot find id ..."
 *     }
 * 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);

/**
 * @api {delete} /api/houses/:id DeleteHouse
 * @apiVersion 1.0.0
 * @apiGroup House
 * @apiName DeleteHouse
 * @apiDescription Removes House
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the house _id
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

module.exports = app => app.use("/houses", router);