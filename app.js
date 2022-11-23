const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const port = 3000

//Template engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

//App.use setting
app.use(bodyParser.urlencoded())

//Route setting
app.get('/', (req, res) => {
  res.render('home')
})

app.post('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`)
})