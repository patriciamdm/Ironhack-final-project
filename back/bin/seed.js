const mongoose = require('mongoose');
const User = require('../models/user.model');

const dbName = 'project-3'
mongoose.connect(`mongodb://localhost/${dbName}`);

User.collection.drop()

const users = [
    {
        username: "Jason Statham",
        password: "aa",
        image: "https://okdiario.com/img/2020/02/16/entrenamiento-de-jason-statham.jpg",
        email: "jasonstatham@elputoamo.com",
        phone: 696969691
    },
    {
        username: "Patricia",
        password: "aa",
        image: "https://i.pinimg.com/originals/ea/d1/08/ead108d55c481b8639f0211a2f77badd.jpg",
        email: "patricia@laputaama.com",
        phone: 696969692
    },
    {
        username: "Manuel",
        password: "aa",
        image: "https://paolarojas.com.mx/wp-content/uploads/2017/02/gente-fea.jpg",
        email: "manuel@elputoamo.com",
        phone: 696969693
    }
]

User
    .create(users)
    .then(() => mongoose.connection.close())
    .catch(err => console.log('Hubo un error,', err))