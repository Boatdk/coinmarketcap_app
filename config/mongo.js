const mongoose = require('mongoose')

const connectMongoDB = async () => {
    const mongoHost = process.env.MONGO_URL
    const mongoUser = process.env.MONGO_USERNAME
    const mongoPsw = process.env.MONGO_PASSWORD
    const mongoURL = `mongodb://${mongoUser}:${mongoPsw}@${mongoHost}`
    const opts = { useNewUrlParser: true, useUnifiedTopology: true }
    mongoose.connect(mongoURL, opts).then(() => {
        console.log('Database connected !!')
    }).catch(err => {
        console.log(err)
    });
}

module.exports = {
    connectMongoDB
}