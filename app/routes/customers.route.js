const router = require("express").Router();
const CustomerController = require('../controllers/customers');
const controller = new CustomerController();
const passport = require('passport');

/**
 * @api {post} /api/tasks AddCustomer
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName AddCustomer
 * @apiDescription Adds New Customer
 *
 * @apiParam (Request body) {String} firstName customer first name
 * @apiParam (Request body) {String} lastName customer last name
 *
 * @apiSuccess (Success 200) {String} message Added record.
 * @apiSuccess (Success 200) {Object} content Object containing information about the customer
 * @apiSuccess (Success 200) {Number} status The status code
 * @apiSuccess (Success 200) {Boolean} success Indicates the success of the request
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      {
 *          name: "Added record",
 *          content: { obj },
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
 *       "error": "Could not add record."
 *     }
 * 
 */
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);

/**
 * @api {get} /api/customers/ GetCustomers
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName GetCustomers
 * @apiDescription Gets All Customers
 * @apiPermission authenticated user
 *
 * @apiSuccess (Success 200) {Array} customers Array containing all customers.
 * @apiSuccess (Success 200) {Object} customer Object containing info about the customer.
 * @apiSuccess (Success 200) {String} customer._id customer id
 * @apiSuccess (Success 200) {String} customer.firstName the customer first name
 * @apiSuccess (Success 200) {String} customer.lastName the customer last name
 * @apiSuccess (Success 200) {Array} customer.houses array of the customer houses ids
 * 
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
 *          _id: '12dsaiudsua827ads',
 *          firstName: 'customer first name',
 *          lastName: 'customer last name',
 *          houses: [ housesIds ],
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
 * @api {get} /api/customers/:id GetCustomer
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName GetCustomer
 * @apiDescription Gets Customer
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the customer _id
 *
 * @apiSuccess (Success 200) {Object} customer Object containing info about the customer.
 * @apiSuccess (Success 200) {String} customer._id customer id
 * @apiSuccess (Success 200) {String} customer.firstName the customer first name
 * @apiSuccess (Success 200) {String} customer.lastName the customer last name
 * @apiSuccess (Success 200) {Array} customer.houses array of the customer houses
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          _id: '12dsaiudsua827ads',
 *          firstName: 'customer first name',
 *          lastName: 'customer last name',
 *          houses: [ houses ],
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
 * @apiError (Error 400) {String} Error Could not get customer.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not get customer."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not get customer.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not get customer. Cannot find id ..."
 *     }
 * 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);

/**
 * @api {put} /api/customers/:id UpdateCustomer
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName UpdateCustomer
 * @apiDescription Updates Customer
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the customer _id
 * @apiParam (Request body) {String} firstName the customer first name
 * @apiParam (Request body) {String} lastName the customer last name
 *
 * @apiSuccess (Success 200) {String} message Customer is now updated.
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *       "success": true,
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
 * @api {delete} /api/customers/:id DeleteCustomer
 * @apiVersion 1.0.0
 * @apiGroup Customer
 * @apiName DeleteCustomer
 * @apiDescription Removes Customer
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the customer _id
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
 * @apiError (Error 400) {String} Error Could not get record.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not remove record."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not get record.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not remove record. Cannot find id ..."
 *     }
 * 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.remove);

module.exports = app => app.use("/customers", router);