const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


let userCheck = (req, res) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.json({ success: false, message: err })
        } else {
            if (!user) {
                res.json({ success: false, message: "No user found with this username" });
            }
            else {
                passwordCheck(req, res, user);
            }
        }
    });
}

let passwordCheck = (req, res, user) => {
    const validPassword = user.comparePassword(req.body.password);
    if (!validPassword) {
        res.json({ success: false, message: "password is invalid" });
    } else {
        const token = jwt.sign({userId:user._id},config.secret,{expiresIn:'24h'});
        res.json({ success: true, message: "login successfull!",token:token,user:{username:user.username}});
    }
}


module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: "You must provide an email" });
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: "You must provide your username" });
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: "You must provide your password" });
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });

                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({ success: false, message: "Username or email already exist. Error:" });
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message });
                                    } else {
                                        if (err.errors.username) {
                                            res.json({ success: false, message: err.errors.username.message });
                                        } else {
                                            if (err.errors.password) {
                                                res.json({ success: false, message: err.errors.password.message });
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success: false, message: "Could not save user. Error:", err });
                                }
                            }
                        } else {
                            res.json({ success: true, message: "user saved successfully!" });
                        }
                    });
                }
            }
        }
    });
    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: "No username provided" });
        } else if (!req.body.password) {
            res.json({ success: false, message: "No password provided!" });
        } else {
            userCheck(req, res);
        }

    });
    return router;
}