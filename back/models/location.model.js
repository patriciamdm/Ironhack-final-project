const mongoose = require("mongoose")
const Schema = mongoose.Schema

const locationSchema = new Schema({
    
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Location = mongoose.model("Location", locationSchema)

module.exports = Location