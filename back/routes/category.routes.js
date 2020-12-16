const express = require('express')
const router = express.Router()

const {checkCategoryId} = require('../middlewares/middleware')

const Category = require('../models/category.model')
const Products = require('../models/category.model')

router.get('/getAllCategories', (req, res) => {

    Category
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneCategory/:category_id', checkCategoryId, (req, res) => {

    Category
        .findById(req.params.category_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newCategory', (req, res) => {

    Category
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editCategory/:category_id', checkCategoryId, (req, res) => {

    Category
        .findByIdAndUpdate(req.params.category_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteCategory/:category_id', checkCategoryId, (req, res) => {

    // Products
    //     .updateMany({category: req.params.category_id},{"$set":{"category":"Others"}} )
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))
    Category
        .findByIdAndDelete(req.params.category_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router