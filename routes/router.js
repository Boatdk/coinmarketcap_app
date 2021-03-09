const express = require('express')
const router = express.Router()

const currencyService = require('../services/currency')

router.route('/currency')
    .post(currencyService.insert)
    .get(currencyService.getCurrency)

module.exports = router