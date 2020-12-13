const mongoose = require('mongoose');
const Location = require('../models/location.model');

const dbName = 'project-3'
mongoose.connect(`${process.env.DB_REMOTE}`);

Location.collection.drop()

const locations = [
    {
        name:'Álava'
    },
    {
        name:'Albacete'
    },
    {
        name:'Alicante'
    },
    {
        name:'Almería'
    },
    {
        name:'Asturias'
    },
    {
        name:'Ávila'
    },
    {
        name:'Badajoz'
    },
    {
        name:'Barcelona'
    },
    {
        name:'Burgos'
    },
    {
        name:'Cáceres'
    },
    {
        name:'Cádiz'
    },
    {
        name:'Cantabria'
    },
    {
        name:'Castellón'
    },
    {
        name:'Ciudad Real'
    },
    {
        name:'Córdoba'
    },
    {
        name:'La Coruña'
    },
    {
        name:'Cuenca'
    },
    {
        name:'Gerona'
    },
    {
        name:'Granada'
    },
    {
        name:'Guadalajara'
    },
    {
        name:'Guipúzcoa'
    },
    {
        name:'Huelva'
    },
    {
        name:'Huesca'
    },
    {
        name:'Islas Baleares'
    },
    {
        name:'Jaén'
    },
    {
        name:'León'
    },
    {
        name:'Lérida'
    },
    {
        name:'Lugo'
    },
    {
        name:'Madrid'
    },
    {
        name:'Málaga'
    },
    {
        name:'Murcia'
    },
    {
        name:'Navarra'
    },
    {
        name:'Orense'
    },
    {
        name:'Palencia'
    },
    {
        name:'Las Palmas'
    },
    {
        name:'Pontevedra'
    },
    {
        name:'La Rioja'
    },
    {
        name:'Salamanca'
    },
    {
        name:'Segovia'
    },
    {
        name:'Sevilla'
    },
    {
        name:'Soria'
    },
    {
        name:'Tarragona'
    },
    {
        name:'Santa Cruz de Tenerife'
    },
    {
        name:'Teruel'
    },
    {
        name:'Toledo'
    },
    {
        name:'Valencia'
    },
    {
        name:'Valladolid'
    },
    {
        name:'Vizcaya'
    },
    {
        name:'Zamora'
    },
    {
        name:'Zaragoza'
    },
    {
        name: 'Ceuta'
    },
    {
        name: 'Melilla'
    },
]

Location
    .create(locations)
    .then(() => mongoose.connection.close())
    .catch(err => console.log('Hubo un error,', err))