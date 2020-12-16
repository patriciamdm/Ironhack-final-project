const express = require('express')
const router = express.Router()

const {checkIdFormat} = require('../middlewares/middleware')

const Category = require('../models/category.model')
const Products = require('../models/category.model')

router.get('/getAllCategories', (req, res) => {

    Category
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneCategory/:id', checkIdFormat, (req, res) => {

    Category
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newCategory', (req, res) => {

    Category
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editCategory/:id', checkIdFormat, (req, res) => {

    Category
        .findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteCategory/:id', checkIdFormat, (req, res) => {
    
    const prodTranslation = new Promise(
        Products
            .updateMany({ category: req.params.id }, { "$set": { "category": "Others" } }) 
    )
    
    const catDelete = new Promise(
        Category
            .findByIdAndDelete(req.params.id) 
    )

    Promise
        .all([prodTranslation, catDelete])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router