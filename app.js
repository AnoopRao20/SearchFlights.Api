const express = require('express')
const cityRoutes = require('./api/routes/cities')
const flightRoutes = require('./api/routes/flights')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// Routes which should handle requests
app.use('/cities', cityRoutes)
app.use('/flights', flightRoutes)

app.use((_req, _res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, _req, res, _next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app