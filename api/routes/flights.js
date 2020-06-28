const express = require('express')
const moment = require('moment')
const flights = require('../data/flights.json')
const router = express.Router()

router.get('/', (req, res, next) => {
    try {
        const sourceCity = (req.query.sourceCity || '').toLowerCase()
        const destinationCity = (req.query.destinationCity || '').toLowerCase()
        const travelDate = parseDate(req.query.travelDate)
        const returnDate = parseDate(req.query.returnDate)

        if(!sourceCity) res.status(400).send('Invalid source city!')
        if(!destinationCity) res.status(400).send('Invalid destination city!')
        if (!travelDate) res.status(400).send('Invalid travel date!')

        const result = flights.filter(flight =>
            flight.sourceCity.toLowerCase() === sourceCity.toLowerCase()
            && flight.destinationCity.toLowerCase() === destinationCity.toLowerCase()
            && moment(flight.departureDateTime).isSame(travelDate, 'day')
            && (moment(flight.departureDateTime).isSame(returnDate, 'day') || 1 === 1))
        res.status(200).json(result)
    } catch (error) {
        throw error
    }
})

const parseDate = (value) => {
    if (!value) {
      return null;
    }

    const date = moment(value);

    return date.isValid()
      ? date.utc().toDate()
      : null;
  }

module.exports = router