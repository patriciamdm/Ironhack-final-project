require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/cors.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)

// Routes index
require('./routes')(app)

// Chat
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})

io.on('connection', socket => {
    socket.on('message', ({ name, message }) => {
        io.emit('message', {name, message})
    })
})

http.listen(4000, function () {
    console.log('listening on port 4000')
})

module.exports = app