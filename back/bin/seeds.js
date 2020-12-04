const mongoose = require('mongoose');
const Product = require('../models/product.model');

const dbName = 'project-3'
mongoose.connect(`mongodb://localhost/${dbName}`);

Product.collection.drop()

const products = [
    {
        name: "Coche de Transporter 1",
        description: "Coche de la película Transporter 1",
        image: "https://sm.ign.com/ign_es/screenshot/t/top-25-mejores-coches-de-cine/top-25-mejores-coches-de-cine_exu4.jpg",
        price: "100000",
        status: "available",
        owner: "5fca81d4509c3c383d781133",
    },
    {
        name: "Coche de Transporter 2",
        description: "Coche de la película Transporter 2",
        image: "https://1.bp.blogspot.com/-O2Vo2VhlTp8/T1_LXUstyiI/AAAAAAAAAEE/RwBdVxjxXTo/s320/audi.jpg",
        price: "110000",
        status: "available",
        owner: "5fca81d4509c3c383d781133",
    },
    {
        name: "Coche de Transporter 3",
        description: "Coche de la película Transporter 3",
        image: "https://www.actualidadmotor.com/wp-content/uploads/2014/07/Audi-A8-Transporter.jpg",
        price: "120000",
        status: "available",
        owner: "5fca81d4509c3c383d781133",
    },
]

Product
    .create(products)
    .then(() => mongoose.connection.close())
    .catch(err => console.log('Hubo un error,', err))