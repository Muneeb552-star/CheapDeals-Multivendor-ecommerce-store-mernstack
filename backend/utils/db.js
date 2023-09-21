const mongoose = require('mongoose')

module.exports.dbConnect = async () => {

    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
        console.log('DATABASE Connected Successfully...')

    } catch (error) {
        console.log(error.message)
    }
}