const express = require('express')
const router = express.Router()

const Category = require('../models/category.model')

router.get('/getAllCategories', (req, res) => {

    Category
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router