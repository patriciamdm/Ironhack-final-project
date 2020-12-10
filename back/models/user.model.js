const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
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
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    rating: [{
        ratingValue: {
            type: Number,
            required: true
        },
        userRating: {
            type: Schema.Types.ObjectId,
            rel: 'User',
            required: true
        }
    }],
    likedProducts: [{
        type: Schema.Types.ObjectId,
        rel: 'Product',
        required: false
    }]
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema)

module.exports = User