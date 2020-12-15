const express = require('express')
const router = express.Router()

const {checkUserId} = require('../middlewares/middleware')

const User = require('../models/user.model')

router.get('/getAllUsers', (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getLast5Users', (req, res) => {

    User
        .find()
        .then(last5UsersArray => last5UsersArray.slice(-5))
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneUser/:user_id', checkUserId, (req, res) => {

    User
        .findById(req.params.user_id)
        .then(response => res.json(response))
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