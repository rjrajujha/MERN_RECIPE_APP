const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//bcrypt : https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');

//User schema
const Users = require("../models/users");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

// define the home page route
router.post('/', async (req, res) => {

    //check whethre usrers existe or not
    const user = await Users.findOne({ username: req.body.username });

    if (user) {

        bcrypt.compare(req.body.password, user.password, (err, result) => {

            var token = jwt.sign({ user_id: user._id }, process.env.mySecretKey, { expiresIn: '2h' });

            try {
                if (result) {

                    return res.json({
                        status: "Sucess",
                        message: "LogIn Sucessfully",
                        token
                    });
                }

                if (!result) {
                    res.json({
                        status: "userSucess",
                        message: "Password doesn't match"
                    });
                }

            } catch (error) {
                if (err) {
                    res.json({
                        status: "userFailed",
                        message: err.message,
                    })
                }
                console.log(error);
            }
        });

    }

    else {
        res.json({
            status: "failed",
            message: "User doesn't exists"
        });
    }

})


module.exports = router;