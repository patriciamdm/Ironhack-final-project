const express = require('express')
const router = express.Router()

const {checkProductId, checkOwnerId} = require('../middlewares/middleware')

const Product = require('../models/product.model')

// GET

router.get('/getAllProducts', (req, res) => {

    Product
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getLast5Products', (req, res) => {

    Product
        .find()
        .then(last5ProdArray => last5ProdArray.slice(-6).reverse())
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneProduct/:product_id', checkProductId, (req, res) => {

    Product
        .findById(req.params.product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getProductsByOwner/:owner_id', checkOwnerId, (req, res) => {

    Product
        .find({owner: req.params.owner_id})
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

router.put('/editProduct/:product_id', checkProductId, (req, res) => {

    Product
        .findByIdAndUpdate(req.params.product_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

// DELETE

router.delete('/deleteProduct/:product_id', checkProductId, (req, res) => {

    Product
        .findByIdAndDelete(req.params.product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router