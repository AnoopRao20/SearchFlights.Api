const express = require('express')
const cities = require('../data/cities.json')
const router = express.Router()

router.get('/', (req, res, next) => {
    try {
        const name = (req.query.name || '').toLowerCase()
        let result
        if (name) {
            result = cities.filter(city =>
                city.name.toLowerCase().startsWith(name)
                || city.name.toLowerCase().includes(name)
            )
        } else {
            result = cities.sort((a, b) => a.name - b.name)
        }
        res.status(200).json(result)
        next()
    } catch (error) {
        throw error
    }
})

module.exports = router