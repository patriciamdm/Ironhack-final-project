const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Rating = require('../models/rating.model')



router.post('/giveRating', (req, res) => {

    const { raterId, ratedId, ratingValue, ratingComment } = req.body

    Rating
        .create({ rater: raterId, rated: ratedId, value: ratingValue, comment: ratingComment })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getUserRatings/:user_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Rating
        .find({ rated: req.params.user_id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

router.get('/getOneRating/:rate_id', (req, res) => {
    
    Rating
        .findById(req.params.rate_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editOneRating/:rate_id', (req, res) => {

    const { ratingValue, ratingComment } = req.body

    Rating
        .findByIdAndUpdate(req.params.rate_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router