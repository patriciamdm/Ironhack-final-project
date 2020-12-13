module.exports = app => {

    // Base URLS
    app.use('/api/products', require('./products.routes.js'))
    app.use('/api/location', require('./location.routes.js'))
    app.use('/api/category', require('./category.routes.js'))
    app.use('/api/rating', require('./rating.routes'))
    app.use('/api/users', require('./users.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api/files', require('./files.routes.js'))
    app.use('/api/mailing', require('./nodemailer.routes'))
}