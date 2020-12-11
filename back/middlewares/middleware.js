const mongoose = require('mongoose')

module.exports = {
    checkProductId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.product_id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' }),
    checkUserId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.user_id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' })
}