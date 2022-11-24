const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('./config/mongoose')
const User = require('./models/user')
const port = 3000

//Template engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

//App.use setting
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

//Route setting for root
app.get('/', (req, res) => {
  const cookie = req.cookies.cookieName
  if (cookie) {
    // 有cookie的情況
    res.render('show', { greeting: `You already logged in!` })
  } else {
    // 沒有cookie的情況
    res.render('home')
  }
})

//Route setting for login
app.post('/', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email, password })
    .lean()
    .then((user) => {
      if (user) {
        //如果帳密正確, 先check if client sent cookie
        const cookie = req.cookies.cookieName
        if (!cookie) {
          //如果還沒有cookie, set a new cookie
          let randomNumber = Math.random().toString()
          randomNumber = randomNumber.substring(2, randomNumber.length) //取小數點後面的數字出來當作cookie
          res.cookie('cookieName', randomNumber, { maxAge: 1000 * 60 * 60, httpOnly: true }) //1小時後過期, The cookie only accessible by the web server
          console.log('cookie created successfully')
        }
        //再render show page
        const firstName = user.firstName
        res.render('show', { greeting: `Hello, ${firstName}!` })
      } else {
        //如果帳密錯誤
        res.render('home', { fail: 'fail' })
      }
    })
    .catch(error => console.error(error))
})
//Route setting for logout
app.get('/logout', (req, res) => {
  res.clearCookie('cookieName');
  res.redirect('/');
})
//Route setting for profile (目前設計用來測試是否成功提供cookie)
app.get('/profile', (req, res) => {
  const cookie = req.cookies.cookieName
  if (cookie) {
    res.render('profile')
  } else {
    res.render('home', { noCookie: 'noCookie' })
  }
})
//Route setting for settings (目前設計用來測試是否成功提供cookie)
app.get('/settings', (req, res) => {
  const cookie = req.cookies.cookieName
  if (cookie) {
    res.render('settings')
  } else {
    res.render('home', { noCookie: 'noCookie' })
  }
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`)
})