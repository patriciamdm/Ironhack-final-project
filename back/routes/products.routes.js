const express = require('express')
const router = express.Router()

const {checkProductId, checkOwnerId} = require('../middlewares/middleware')

const Product = require('../models/product.model')

router.get('/getAllProducts', (req, res) => {

    Product
        .find()
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

router.post('/newProduct', (req, res) => {

    Product
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editProduct/:product_id', checkProductId, (req, res) => {

    Product
        .findByIdAndUpdate(req.params.product_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteProduct/:product_id', checkProductId, (req, res) => {

    Product
        .findByIdAndDelete(req.params.product_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router