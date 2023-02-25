const router = require('express').Router();
const jwtAuth = require("../Middleware/Auth");

//User schema
const Users = require("../models/users");

router.get('/', jwtAuth, async (req, res) => {
    try {
        const data = await Users.find({ _id: req.useridref });
        const username = data[0].username;

        res.json({
            status: "sucess",
            user: username
        });
        res.end();
    }
    catch (error) {
        res.json({
            status: "failed",
            error
        });
    }
})

module.exports = router;