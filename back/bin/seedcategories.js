const mongoose = require('mongoose');
const Category = require('../models/category.model');

const dbName = 'project-3'
mongoose.connect(`${process.env.DB_REMOTE}`);

Category.collection.drop()

const categories = [
    {
        name:'motor'
    },
    {
        name:'fashion'
    },
    {
        name:'electronics'
    },
    {
        name:'sports'
    },
    {
        name:'home'
    },
    {
        name:'culture'
    },
    {
        name:'pet'
    },
    {
        name:'fantasy'
    },
    {
        name:'others'
    }
]

Category
    .create(categories)
    .then(() => mongoose.connection.close())
    .catch(err => console.log('Hubo un error,', err))