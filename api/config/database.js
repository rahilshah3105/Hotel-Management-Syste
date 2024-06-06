const mongoose = require('mongoose')
require('dotenv').config()

const connectDatabase = async() => {
    try {
        const data = await mongoose.connect('mongodb://127.0.0.1:27017/luxereserve'); //mongodb://127.0.0.1:27017/luxereserve
        console.log("Database connection established on", data.connection.host)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDatabase;