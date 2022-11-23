const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user')
const port = 3000

//Template engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

//App.use setting
app.use(bodyParser.urlencoded({ extended: true }))

//非正式環境使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Mongoose setting
mongoose.connect(process.env.MONGODB_URI, ({ useNewUrlParser: true, useUnifiedTopology: true }))
const db = mongoose.connection
db.on('error', () => { console.log('MongoDB connection error!') })
db.once('open', () => { console.log('MongoDB connected!') })

//Route setting
app.get('/', (req, res) => {
  res.render('home')
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email, password })
    .lean()
    .then((user) => {
      if (user) {
        const firstName = user.firstName
        res.render('show', { firstName })
      } else {
        res.render('home', { fail: 'fail' })
      }
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`)
})