const express = require("express");
const User = require("../models/user")
const router = express.Router();
// const bcrypt = require("bcrypt");
router.post("/signup", (req, res, next) => {
    
   const user = new User({
       email:req.body.email,
       password:req.body.password
   })

});

module.exports = router;

// bcrypt.hash(req.body.password, 10).then(hash => {
    //     const user = new user({
    //         email: req.body.email,
    //         // password:req.body.password
    //         password: hash
    //     });
    //     user.save().then(result => {
    //         res.status(201).json({
    //             message: 'User created !',
    //             result: result
    //         })
    //     }).catch(err=>{
    //         res.status(500).json({
    //             error:err
    //         })
    //     })
    // });