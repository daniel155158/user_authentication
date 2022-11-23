const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('./config/mongoose')
const User = require('./models/user')
const port = 3000

//Template engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

//App.use setting
app.use(bodyParser.urlencoded({ extended: true }))

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