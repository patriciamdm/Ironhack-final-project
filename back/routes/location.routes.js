const express = require('express')
const router = express.Router()

const Location = require('../models/location.model')

router.get('/getAllLocations', (req, res) => {

    Location
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router