const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BotRateSchema = new Schema({
    key: String,
    value: String,
    time: String
})

module.exports = mongoose.model('configs', BotRateSchema)