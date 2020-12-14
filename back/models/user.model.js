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
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    rating: [{
            type: Schema.Types.ObjectId,
            rel: 'Rating',
            required: false
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