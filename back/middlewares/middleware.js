const mongoose = require('mongoose')

module.exports = {
    checkProductId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.product_id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' }),
    checkUserId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.user_id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' }),
    checkOwnerId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.owner_id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' }),
    checkCategoryId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.category_id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' }),
    checkLocationId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.location_id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' }),
    checkRatingId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.rate_id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' })
}