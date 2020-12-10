const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['motor', 'fashion', 'electronics', 'sports', 'home', 'culture', 'others']
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'sold'],
        required: true
    },
    location: {
        type: String,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        rel: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema)

module.exports = Product