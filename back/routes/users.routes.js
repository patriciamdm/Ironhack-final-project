const express = require('express')
const router = express.Router()

const {checkIdFormat} = require('../middlewares/middleware')

const User = require('../models/user.model')

router.get('/getAllUsers', (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getLast6Users', (req, res) => {

    User
        .find({}, { username: 1, image: 1, rating: 1 })
        .limit(6)
        .sort({createdAt: -1})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneUser/:id', checkIdFormat, (req, res) => {

    User
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/:id', checkIdFormat, (req, res) => {

    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteUser/:id', checkIdFormat, (req, res) => {

    User
        .findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router