const UserInfo = require('../models/userInfo');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = (router) => {
    router.post('/create-info', (req, res) => {
        let profile = new UserInfo({
            username: req.body.username,
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.dob,
            primaryOccupation: req.body.primaryOccupation,
            secondaryOccupation: req.body.secondaryOccupation,
            skills: req.body.skills,
            phone: req.body.phone,
            email: req.body.email,
            languageknown: req.body.languageknown,
            workExperience: req.body.workExperience,
            overview: req.body.overview
        });

        profile.save((err) => {
            if (err) {
                res.json({ status: false, message: "user could not save" + err });
            } else {
                res.json({ status: true, message: "profile saved" });
            }
        });
    });

    router.post('/get-info', (req, res) => {
        
        UserInfo.findOne({ username: req.body.username}).exec((err, userInfo) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!userInfo) {
                    res.json({ success: false, message: "user not found" + userInfo });
                } else {
                    res.json({ success: true, userInfo: userInfo });
                }
            }
        }); 
    });

    return router;
};