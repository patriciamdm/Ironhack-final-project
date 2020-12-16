const express = require('express')
const router = express.Router()

const {checkIdFormat} = require('../middlewares/middleware')

const Location = require('../models/location.model')

router.get('/getAllLocations', (req, res) => {

    Location
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneLocation/:id', checkIdFormat, (req, res) => {

    Location
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newLocation', (req, res) => {

    Location
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editLocation/:id', checkIdFormat, (req, res) => {

    Location
        .findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteLocation/:id', checkIdFormat, (req, res) => {

    Location
        .findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router