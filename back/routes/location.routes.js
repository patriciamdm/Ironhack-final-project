const express = require('express')
const router = express.Router()

const {checkLocationId} = require('../middlewares/middleware')

const Location = require('../models/location.model')

router.get('/getAllLocations', (req, res) => {

    Location
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneLocation/:location_id', checkLocationId, (req, res) => {

    Location
        .findById(req.params.location_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newLocation', (req, res) => {

    Location
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editLocation/:location_id', checkLocationId, (req, res) => {

    Location
        .findByIdAndUpdate(req.params.location_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteLocation/:location_id', checkLocationId, (req, res) => {

    Location
        .findByIdAndDelete(req.params.location_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router