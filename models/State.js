const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StateSchema = new Schema({
    datetime: String,
    bot_rate: Number,
    state_cap: {type: [Object]}
}, {
    timestamps: true
})

module.exports = mongoose.model('state', StateSchema)