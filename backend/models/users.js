// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const Users = mongoose.model("users", UserSchema);

module.exports = Users;