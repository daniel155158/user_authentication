const mongoose = require('mongoose')

//非正式環境使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Mongoose setting
mongoose.connect(process.env.MONGODB_URI, ({ useNewUrlParser: true, useUnifiedTopology: true }))
const db = mongoose.connection
db.on('error', () => { console.log('MongoDB connection error!') })
db.once('open', () => { console.log('MongoDB connected!') })

module.exports = db