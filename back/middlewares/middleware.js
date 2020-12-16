const mongoose = require('mongoose')

module.exports = {
    checkIdFormat: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.id) ? next() : res.status(404).json({ code: 404, message: 'Invalid ID' })
}