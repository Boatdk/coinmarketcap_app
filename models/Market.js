const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MarketSchema = new Schema({
    datetime: String,
    bot_rate: Number,
    market_cap: {type: [Object]}
}, {
    timestamps: true
})

module.exports = mongoose.model('market', MarketSchema)