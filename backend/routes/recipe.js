const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwtAuth = require("../Middleware/Auth");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json());

// define default route
router.get('/', jwtAuth, async (req, res) => {
    try {
        res.json({
            status: "sucess",
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

// route to Add
router.post('/add', jwtAuth, async (req, res) => {
    try {
        res.json({
            status: "sucess",
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

// route to Edit
router.put('/edit', jwtAuth, async (req, res) => {
    try {
        res.json({
            status: "sucess",
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

// route to Delete
router.delete('/del', jwtAuth, async (req, res) => {
    try {
        res.json({
            status: "sucess",
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