const Currency = require('../models/Currency')

const insert = async (req, res) => {
    const body = req.body
    console.log(body)
    const { name, symbol } = body
    const data = {
        name: name,
        symbol: symbol
    }
    console.log(data)
    await Currency.create(data)
    return res.status(200).json({ msg: 'create success' })
}

const getCurrency = async (req, res) => {
    const currency = await Currency.find()
    return res.status(200).json(currency)
}

module.exports = {
    insert,
    getCurrency
}