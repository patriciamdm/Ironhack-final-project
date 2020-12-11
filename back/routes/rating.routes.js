const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Rating = require('../models/rating.model')



router.post('/giveRating', (req, res) => {

    const { raterId, ratedId, ratingValue } = req.body

    Rating
        .create({ rater: raterId, rated: ratedId, value: ratingValue })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getUserRating/:user_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Rating
        .find({ rated: req.params.user_id })
        .then(response => res.jason(response))
        .catch(err => res.status(500).json(err))
    
})

// router.get('/getSpecificRating', (req, res) => {

//     const { raterId, ratedId, ratingValue } = req.body

//     Rating
//         .find({ rated: ratedId, rater: raterId })
//         .then(response => res.jason(response))
//         .catch(err => res.status(500).json(err))
// })

// router.put('/editSpecificRating', (req, res) => {

//     const { raterId, ratedId } = req.body

//     Rating
//         .find({ rater: raterId, rated: ratedId })
//         .then(response => res.jason(response))
//         .catch(err => res.status(500).json(err))
// })


module.exports = router