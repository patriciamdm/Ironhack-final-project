const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ratingSchema = new Schema({
    rater: {
        type: Schema.Types.ObjectId,
        rel: 'User',
        required: true
    },
    rated: {
        type: Schema.Types.ObjectId,
        rel: 'User',
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Rating = mongoose.model("Rating", ratingSchema)

module.exports = Rating