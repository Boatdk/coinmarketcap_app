const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CurrencySchema = new Schema({
    symbol: String,
    name: String
},{
    timestamps: true
})

module.exports = mongoose.model('currency', CurrencySchema)