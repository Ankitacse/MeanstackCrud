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

router.post("/login", async (req, res, next) => {
    let fetchedUser;
    try {
        const user =  await User.findOne({ email: req.body.email });
    
        if(!user) {
            return res.status(401).json({
                message: "Email invalid"
            });
        }
    
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
    
        if(!checkPassword) {
            return res.status(401).json({
                message: "Wrong email and password"
            });
        }
        const token = jwt.sign(
            user,
            'secret_this_should_be_longer',
            { expiresIn: "1h" }
        );
    
        res.status(200).json({
            token: token
        });

    } catch (error) {
        throw error;
    }
   
});
module.exports = router;

