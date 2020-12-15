const express = require('express')
const router = express.Router()

const { checkUserId, checkRatingId } = require('../middlewares/middleware')


const Rating = require('../models/rating.model')

router.post('/giveRating', (req, res) => {

    const { raterId, ratedId, ratingValue, ratingComment } = req.body

    Rating
        .create({ rater: raterId, rated: ratedId, value: ratingValue, comment: ratingComment })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getUserRatings/:user_id', checkUserId, (req, res) => {

    Rating
        .find({ rated: req.params.user_id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

router.get('/getOneRating/:rate_id', checkRatingId, (req, res) => {
    
    Rating
        .findById(req.params.rate_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getRaterRate/:rater_id/:rated_id', (req, res) => {
    
    Rating
        .find({ rater: req.params.rater_id, rated: req.params.rated_id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editOneRating/:rate_id', checkRatingId, (req, res) => {

    Rating
        .findByIdAndUpdate(req.params.rate_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteRating/:rate_id', checkRatingId, (req, res) => {

    Rating
        .findByIdAndDelete(req.params.rate_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router