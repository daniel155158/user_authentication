const mongoose = require('mongoose')
const User = require('../user')

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

//非正式環境使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Mongoose setting
mongoose.connect(process.env.MONGODB_URI, ({ useNewUrlParser: true, useUnifiedTopology: true }))
const db = mongoose.connection
db.on('error', () => { console.log('MongoDB connection error!') })
db.once('open', () => {
  console.log('MongoDB connected!')
  User.insertMany(users)
  console.log('Done!')
})