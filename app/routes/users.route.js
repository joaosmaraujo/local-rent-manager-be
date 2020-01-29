const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config').SECRET;

const User = require("../models/users");
const UserController = require('../controllers/users');
const controller = new UserController();

/**
 * @api {get} /api/users/ GetUsers
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName GetUsers
 * @apiDescription Gets All Users
 * @apiPermission authenticated user
 *
 * @apiSuccess (Success 200) {Array} users[user] Array containing all users.
 * @apiSuccess (Success 200) {Object} user Object containing info about the user.
 * @apiSuccess (Success 200) {Object} user.counters Object containing info about the user counters.
 * @apiSuccess (Success 200) {String} user._id user id
 * @apiSuccess (Success 200) {String} user.firstName user first name
 * @apiSuccess (Success 200) {String} user.lastName user last name
 * @apiSuccess (Success 200) {String} user.username user username
 * @apiSuccess (Success 200) {String} user.email user email
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     [{
 *       "user": {
 *          "counters": {
 *              "tasks": 1,
 *              "checkIns": 1,
 *               "checkOuts": 1
 *           },
 *           "createdAt": ...
 *           "_id": ...
 *            "firstName": "first name",
 *            "lastName": "last name",
 *            "username": "username",
 *            "email": "user@email.com"
 *        }
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
 * @api {post} /api/users/register Register
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName PostRegister
 * @apiDescription Registers New User
 *
 * @apiParam (Request body) {String} firstName the user first name
 * @apiParam (Request body) {String} lastName the user last name
 * @apiParam (Request body) {String} username the user username
 * @apiParam (Request body) {String} email the user email
 * @apiParam (Request body) {String} password the user password
 * @apiParam (Request body) {String} confirm_password the user password confirmation
 *
 * @apiSuccess (Success 200) {Object} message User is now registered.
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *       "success": true,
 *       "msg": "User is now registered."
 *     }
 *
 * @apiError (Error 400) {String} Error Password does not match.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Password does not match."
 *     }
 * 
 * @apiError (Error 400) {String} Error Username is already taken.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Username is already taken. Did you forgot your password?"
 *     }
 * 
 * @apiError (Error 400) {String} Error Email is already registered.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Email is already registered. Did you forgot your password?"
 *     }
 * 
 */
router.post('/register', (req, res) => {
    let { firstName, lastName, username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({ error: 'Password does not match.'});
    }
    // Check for unique username
    User.findOne({ username: username }).then(user => {
        if (user) {
            return res.status(400).json({
                error: 'Username is already taken. Did you forgot your password?'
            });
        }
    });
    // Check for unique email
    User.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json({
                error: 'Email is already registered. Did you forgot your password?'
            });
        }
    });
    // The data is valid and new user can be registered
    let newUser = new User({ firstName, lastName, username, email, password });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({ success: true, msg: 'User is now registered.'})
            })
        })
    })
});

/**
 * @api {put} /api/users/reset-password/:id ResetPassword
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName PutResetPassword
 * @apiDescription Resets User Password
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the user _id
 * @apiParam (Request body) {String} password the user new password
 * @apiParam (Request body) {String} confirm_password the user new password confirmation
 *
 * @apiSuccess (Success 200) {String} message Password is now changed.
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *       "success": true,
 *       "msg": "Password is now changed."
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
 * @apiError (Error 400) {String} Error Password does not match.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 400 Error
 *     {
 *       "error": "Password does not match."
 *     }
 * 
 */
router.put('/reset-password/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({ error: 'Password does not match' });
    }
    // Find user
    User.findOne({ _id: req.params.id }).then(user => {
        if (user) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save().then(() => {
                        return res.status(201).json({ success: true, msg: 'Password is now changed.' })
                    })
                })
            });
        }
    });
});

/**
 * @api {put} /api/users/:id ChangeUserDetails
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName PutChangeUserDetails
 * @apiDescription Changes User Details
 * @apiPermission authenticated user
 *
 * @apiParam (Request param) {String} _id the user _id
 * @apiParam (Request body) {String} firstName the user first name
 * @apiParam (Request body) {String} lastName the user last name
 * @apiParam (Request body) {String} username the user username
 * @apiParam (Request body) {String} email the user email
 *
 * @apiSuccess (Success 200) {String} message Password is now changed.
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *       "success": true,
 *       "msg": "User details are now changed."
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
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { firstName, lastName, username, email } = req.body;
    // Find user
    User.findOne({ _id: req.params.id }).then(user => {
        if (user) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.username = username;
            user.email = email;
            user.save().then(() => {
                return res.status(201).json({ success: true, msg: 'User details are now changed.' })
            });
        }
    });
});

/**
 * @api {post} /api/users/login Login
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName PostLogin
 * @apiDescription Login User
 * @apiPermission authenticated user
 *
 * @apiParam (Request body) {String} username the user username
 * @apiParam (Request body) {String} password the user password
 *
 * @apiSuccess (Success 200) {String} message You are now logged in.
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *       "success": true,
 *       "user": {
 *          "counters": {
 *              "tasks": 1,
 *              "checkIns": 1,
 *               "checkOuts": 1
 *           },
 *           "createdAt": ...
 *           "_id": ...
 *            "firstName": "first name",
 *            "lastName": "last name",
 *            "username": "username",
 *            "email": "user@email.com"
 *        },
 *      "token": jwt,
 *      "msg": "You are now logged in."
 *     }
 *
 * @apiError (Error 404) {String} NotFound Username not found.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "success": false
 *       "error": "Username not found."
 *     }
 * 
 * @apiError (Error 404) {String} NotFound Incorrect password.
 *
 * @apiErrorExample Error-Response:
 *     HTTP 404 Not Found
 *     {
 *       "sucess": false
 *       "error": "Incorrect password"
 *     }
 * 
 */
router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if(!user) {
            return res.status(404).json({
                error: 'Username not found',
                success: false
            });
        }

        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
                return jwt.sign(payload, key, { expiresIn: 604800 }, (err, token) => {
                    return res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        msg: 'You are now logged in.'
                    })
                });
            } else {
                return res.status(404).json({
                    error: 'Incorrect password',
                    success: false
                });
            }
        })
    })
});

/**
 * @api {get} /api/users/:id GetUser
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName GetUser
 * @apiDescription Gets User
 * @apiPermission authenticated user
 *
 * * @apiParam (Request param) {String} _id the user _id
 *
 * @apiSuccess (Success 200) {Object} user Object containing information about the user.
 * @apiSuccess (Success 200) {Object} user.counters Object containing info about the user counters.
 * @apiSuccess (Success 200) {String} user._id user id
 * @apiSuccess (Success 200) {String} user.firstName user first name
 * @apiSuccess (Success 200) {String} user.lastName user last name
 * @apiSuccess (Success 200) {String} user.username user username
 * @apiSuccess (Success 200) {String} user.email user email
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *     {
 *          "counters": {
 *              "tasks": 1,
 *              "checkIns": 1,
 *              "checkOuts": 1
 *          },
 *          "createdAt": ...
 *          "_id": ...
 *          "firstName": "first name",
 *          "lastName": "last name",
 *          "username": "username",
 *          "email": "user@email.com"
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
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ user: req.user });
});

module.exports = app => app.use("/users", router);
