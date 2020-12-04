const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSch = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSch)

module.exports = User