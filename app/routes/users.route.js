const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config').SECRET;

const User = require("../models/users");
const UserController = require('../controllers/users');
const controller = new UserController(User);

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.post('/register', (req, res) => {
    let { firstName, lastName, username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({ msg: "Password does not match"});
    }
    // Check for unique username
    User.findOne({ username: username }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Username is already taken."
            });
        }
    });
    // Check for unique email
    User.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Email is already registered. Did you forgot your password?"
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
                return res.status(201).json({ success: true, msg: "User is now registered."})
            })
        })
    })
});

router.put('/:id/reset-password', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({ msg: "Password does not match"});
    }
    // Find user
    User.findOne({ _id: req.params.id }).then(user => {
        if (user) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save().then(() => {
                        return res.status(201).json({ success: true, msg: "Password is now changed."})
                    })
                })
            });
        }
    });
});

router.put('/:id/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { firstName, lastName, username, email } = req.body;
    // Find user
    User.findOne({ _id: req.params.id }).then(user => {
        if (user) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.username = username;
            user.email = email;
            user.save().then(() => {
                return res.status(201).json({ success: true, msg: "User details are now changed."})
            });
        }
    });
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if(!user) {
            return res.status(404).json({
                msg: "Username is not found",
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
                        msg: "You are now logged in."
                    })
                });
            } else {
                return res.status(404).json({
                    msg: "Incorrect password",
                    success: false
                });
            }
        })
    })
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ user: req.user });
});

module.exports = app => app.use("/users", router);
