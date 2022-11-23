const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

//Template engine setting
app.engine('hbs', exphbs({ defailtLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`)
})