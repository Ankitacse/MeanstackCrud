// sudo npm i --save bcryptjs
/* "sudo npm install --save jsonwebtoken" for token */
const express = require("express");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(result => {
            res.status(201).json({
                message: 'User created !',
                result: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });

});

// router.post("/login", async (req, res, next) => {
//     let fetchedUser;
//     try {
//         const user = await User.findOne({ email: req.body.email });

//         if (!user) {
//             return res.status(401).json({
//                 message: "Email invalid"
//             });
//         }

//         const checkPassword = await bcrypt.compare(req.body.password, user.password);
//         if (!checkPassword) {
//             return res.status(401).json({
//                 message: "Wrong email and password"
//             });
//         }
//         const token = jwt.sign(
//             user,
//             "secret_this_should_be_longer",
//             { expiresIn: "1h" }
//         );
//         res.status(200).json({
//             token: token
//         });

//     } catch (error) {
//         throw error;
//     }

// });

router.post("/login", (req, res, next) => {
    let fetchedUsers;
    User.findOne({ email: req.body.email }).then(user => {
        /*find one user and now check weather user exit or not */
        /* if user not exit*/
        if (!user) {
            return res.status(401).json({
                message: 'Auth Failed User not exit'
            });
        }
        /* nocomparing check pasword by */
        fetchedUsers=user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Auth Failed result'
            });
        }
        const token = jwt.sign(
            { email: fetchedUsers.email, userId: fetchedUsers._id },
            "secret_this_should_be_longer",
            { expiresIn: "1h" });
            res.status(200).json({
                token:token
            });
    }).catch(err => {
        return res.status(401).json({
            message: 'Auth Failed catch'
        });
    });
});
module.exports = router;

