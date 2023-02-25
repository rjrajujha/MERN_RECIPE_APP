const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuth = ((req, res, next) => {

    let token = req.headers.authorization;
    // console.log("Token :", token);

    if (token) {

        // verify a token symmetric - synchronous
        // var decodedWithSync = jwt.verify(token, process.env.mySecretKey);
        // console.log("Decoded with symmetric - synchronous :", decodedWithSync);

        // verify a token symmetric
        jwt.verify(token, process.env.mySecretKey, (err, decoded) => {
            try {
                if (decoded) {
                    if (req.baseUrl === "/getuser") {
                        req.useridref = decoded.user_id
                    }
                    next()
                }
                else {
                    res.json({
                        status: "failed",
                        message: "not_a_valid_token"
                    })
                }
            }
            catch (error) {
                if (err) {
                    console.log("Error :", err);
                }
                res.json({
                    status: "failed",
                    message: "error_validating_token",
                    error
                })
            }
        });
    }

    else {
        res.json({
            status: "failed",
            message: "unauthorized"
        })
    }
})

module.exports = jwtAuth;