const express = require('express')
const router = express.Router()

const {checkIdFormat} = require('../middlewares/middleware')

const Product = require('../models/product.model')

// GET

router.get('/getAllProducts', (req, res) => {

    Product
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getLast6Products', (req, res) => {

    Product
        .find({}, { name: 1, image: 1, status: 1 })
        .limit(6)
        .sort({createdAt: -1})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneProduct/:id', checkIdFormat, (req, res) => {

    Product
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getProductsByOwner/:id', checkIdFormat, (req, res) => {

    Product
        .find({owner: req.params.id})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// ANALYTICS

router.get('/getProductsByCategory/:category_name', (req, res) => {

    Product
        .find({category: req.params.category_name})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getProductsByLocation/:location_name', (req, res) => {

    Product
        .find({location: req.params.location_name})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getProductsByStatus/:status', (req, res) => {

    Product
        .find({status: req.params.status})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// POST

router.post('/newProduct', (req, res) => {

    Product
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// PUT

router.put('/editProduct/:id', checkIdFormat, (req, res) => {

    Product
        .findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// DELETE

router.delete('/deleteProduct/:id', checkIdFormat, (req, res) => {

    Product
        .findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router