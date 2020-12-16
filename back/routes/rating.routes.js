const express = require('express')
const router = express.Router()

const { checkIdFormat} = require('../middlewares/middleware')


const Rating = require('../models/rating.model')

router.get('/getUserRatings/:id', checkIdFormat, (req, res) => {

    Rating
        .find({ rated: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
    
})

router.get('/getOneRating/:id', checkIdFormat, (req, res) => {
    
    Rating
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getRaterRate/:rater_id/:rated_id', (req, res) => {
    
    Rating
        .find({ rater: req.params.rater_id, rated: req.params.rated_id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/giveRating', (req, res) => {

    const { raterId, ratedId, ratingValue, ratingComment } = req.body

    Rating
        .create({ rater: raterId, rated: ratedId, value: ratingValue, comment: ratingComment })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editOneRating/:id', checkIdFormat, (req, res) => {

    Rating
        .findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteRating/:id', checkIdFormat, (req, res) => {

    Rating
        .findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router