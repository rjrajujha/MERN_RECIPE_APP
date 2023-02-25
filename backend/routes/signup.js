const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const validUser = require("../Middleware/CheckUser");

//bcrypt : https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//User schema
const Users = require("../models/users");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

// define the home page route
router.post('/', validUser, async (req, res) => {

    //check whethre usrers alread existe or not
    const user = await Users.findOne({ username: req.body.username });

    if (user) {
        return res.json({
            status: "failed",
            message: "User already exists"
        });
    }

    // Create new User
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {

        await Users.create({ "username": req.body.username, "password": hash });

        if (err) {
            return res.json({
                status: "failed",
                message: err.message,
            });
        }

        return res.json({
            status: "Success",
            message: "User Succesfully created"
        });

    });

})

module.exports = router;