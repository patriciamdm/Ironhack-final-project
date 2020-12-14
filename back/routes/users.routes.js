const express = require('express')
const router = express.Router()

const {checkUserId} = require('../middlewares/middleware')

const User = require('../models/user.model')
const Product = require('../models/product.model')

router.get('/getAllUsers', (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneUser/:user_id', checkUserId, (req, res) => {

    User
        .findById(req.params.user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getFavouriteProductsOfUser/:user_id', checkUserId, (req, res) => {

    User
        .findById(req.params.user_id)
        .then(response => res.json(response.likedProducts))
        .then(arrayOfId => res.json(arrayOfId.forEach(element => {
            Product
                .findById(element)
                .then(response => res.json(response))
                .catch(err => res.status(500).json(err))
        })))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/:user_id', checkUserId, (req, res) => {

    User
        .findByIdAndUpdate(req.params.user_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteUser/:user_id', checkUserId, (req, res) => {

    User
        .findByIdAndDelete(req.params.user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router