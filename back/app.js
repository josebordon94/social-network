var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var authRouter = require('./routes/authRouter')
var postsRouter = require('./routes/postsRouter')

var app = express()

const jwtConfig = require('./bin/jwtConfig')
const { verifyJWT } = require('./bin/jwtConfig')

//img uploads folder
var fs = require('fs')
var dir = './public/img'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', authRouter)
app.use('/isUserAuth', verifyJWT, (req, res) => {
  res.json({ loggedIn: true, user: req.user })
})
app.use('/posts', jwtConfig.verifyJWT, postsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
