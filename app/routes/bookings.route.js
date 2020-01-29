const router = require("express").Router();
const BookingController = require('../controllers/bookings');
const controller = new BookingController();
const passport = require('passport');

/**
 * @api {post} /api/bookings AddBooking
 * @apiVersion 1.0.0
 * @apiGroup Booking
 * @apiName AddBooking
 * @apiDescription Adds New Booking
 *
 * @apiParam (Request body) {String} guestFirstName guest first name
 * @apiParam (Request body) {String} guestLastName guest last name
 * @apiParam (Request body) {String} house id of the house which the booking was scheduled for
 * @apiParam (Request body) {Date} checkInDate check-in date
 * @apiParam (Request body) {Date} checkOutDate check-out date
 * @apiParam (Request body) {Boolean} checkInCompleted indicates if the check-in was done
 * @apiParam (Request body) {Boolean} checkOutCompleted indicates if the check-out was done
 * @apiParam (Request body) {String} checkInBy id of the the user who took care of the check-in
 * @apiParam (Request body) {String} checkOutBy id of the the user who took care of the check-out
 *
 * @apiSuccess (Success 200) {String} message Added booking.
 * @apiSuccess (Success 200) {Object} content Object containing information about the booking
 * @apiSuccess (Success 200) {Number} status The status code
 * @apiSuccess (Success 200) {Boolean} success Indicates the success of the request
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *      {
 *          name: "Added booking",
 *          content: {
 *              guestFirstName: "First",
 *              guestLastName: "Last",
 *              house: "sjaa918ahds99aui8",
 *              checkInDate: "2020-02-20",
 *              checkOutDate: "2020-02-27",
 *              checkInCompleted: false,
 *              checkOutCompleted: false,
 *              checkInBy: "hyg76trafe8aia999",
 *              checkOutBy: "mnah65432edasqw87"
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
 * @apiError (Error 400) {String} Error Could not add booking.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not add booking."
 *     }
 * 
 */
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);

/**
 * @api {get} /api/bookings/ GetBookings
 * @apiVersion 1.0.0
 * @apiGroup Booking
 * @apiName GetBookings
 * @apiDescription Gets All Bookings
 * @apiPermission authenticated user
 *
 * @apiSuccess (Success 200) {Array} bookings Array containing all bookings.
 * @apiSuccess (Success 200) {Object} booking Object containing info about the booking.
 * @apiSuccess (Success 200) {String} booking._id booking id
 * @apiSuccess (Success 200) {String} booking.guestFirstName guest first name
 * @apiSuccess (Success 200) {String} booking.guestLastName guest last name
 * @apiSuccess (Success 200) {String} booking.house id of the house which the booking was scheduled for
 * @apiSuccess (Success 200) {Date} booking.checkInDate check-in date
 * @apiSuccess (Success 200) {Date} booking.checkOutDate check-out date
 * @apiSuccess (Success 200) {Boolean} booking.checkInCompleted indicates if the check-in was done
 * @apiSuccess (Success 200) {Boolean} booking.checkOutCompleted indicates if the check-out was done
 * @apiSuccess (Success 200) {String} booking.checkInBy id of the the user who took care of the check-in
 * @apiSuccess (Success 200) {String} booking.checkOutBy id of the the user who took care of the check-out
 * 
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
 *          guestFirstName: "First",
 *          guestLastName: "Last",
 *          house: "sjaa918ahds99aui8",
 *          checkInDate: "2020-02-20",
 *          checkOutDate: "2020-02-27",
 *          checkInCompleted: false,
 *          checkOutCompleted: false,
 *          checkInBy: "hyg76trafe8aia999",
 *          checkOutBy: "mnah65432edasqw87"
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
 * @apiError (Error 404) {String} NotFound Failed to retrieve bookings
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Failed to retrieve bookings"
 *     }
 * 
 */
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);

/**
 * @api {get} /api/bookings/:id GetBooking
 * @apiVersion 1.0.0
 * @apiGroup Booking
 * @apiName GetBooking
 * @apiDescription Gets Booking
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the booking _id
 *
 * @apiSuccess (Success 200) {Object} booking Object containing info about the booking.
 * @apiSuccess (Success 200) {String} booking._id booking id
 * @apiSuccess (Success 200) {String} booking.guestFirstName guest first name
 * @apiSuccess (Success 200) {String} booking.guestLastName guest last name
 * @apiSuccess (Success 200) {String} booking.house id of the house which the booking was scheduled for
 * @apiSuccess (Success 200) {Date} booking.checkInDate check-in date
 * @apiSuccess (Success 200) {Date} booking.checkOutDate check-out date
 * @apiSuccess (Success 200) {Boolean} booking.checkInCompleted indicates if the check-in was done
 * @apiSuccess (Success 200) {Boolean} booking.checkOutCompleted indicates if the check-out was done
 * @apiSuccess (Success 200) {String} booking.checkInBy id of the the user who took care of the check-in
 * @apiSuccess (Success 200) {String} booking.checkOutBy id of the the user who took care of the check-out
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          guestFirstName: "First",
 *          guestLastName: "Last",
 *          house: "sjaa918ahds99aui8",
 *          checkInDate: "2020-02-20",
 *          checkOutDate: "2020-02-27",
 *          checkInCompleted: false,
 *          checkOutCompleted: false,
 *          checkInBy: "hyg76trafe8aia999",
 *          checkOutBy: "mnah65432edasqw87"
 *          createdAt: '2020-01-30'
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
 * @apiError (Error 400) {String} Error Could not get booking.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not get booking."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not get booking.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not get booking. Cannot find id ..."
 *     }
 * 
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.get);

/**
 * @api {put} /api/bookings/:id UpdateBooking
 * @apiVersion 1.0.0
 * @apiGroup Booking
 * @apiName UpdateBooking
 * @apiDescription Updates Booking
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the booking _id
 * @apiParam (Request body) {String} guestFirstName guest first name
 * @apiParam (Request body) {String} guestLastName guest last name
 * @apiParam (Request body) {String} house id of the house which the booking was scheduled for
 * @apiParam (Request body) {Date} checkInDate check-in date
 * @apiParam (Request body) {Date} checkOutDate check-out date
 * @apiParam (Request body) {Boolean} checkInCompleted indicates if the check-in was done
 * @apiParam (Request body) {Boolean} checkOutCompleted indicates if the check-out was done
 * @apiParam (Request body) {String} checkInBy id of the the user who took care of the check-in
 * @apiParam (Request body) {String} checkOutBy id of the the user who took care of the check-out
 *
 * @apiSuccess (Success 200) {String} message Booking is now updated.
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
 * @apiError (Error 400) {String} Error Could not edit booking.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Could not edit booking."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Could not edit booking.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "error": "Could not edit booking. Cannot find id ..."
 *     }
 * 
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.update);

/**
 * @api {delete} /api/bookings/:id DeleteBooking
 * @apiVersion 1.0.0
 * @apiGroup Booking
 * @apiName DeleteBooking
 * @apiDescription Removes Booking
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the booking _id
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

module.exports = app => app.use("/bookings", router);