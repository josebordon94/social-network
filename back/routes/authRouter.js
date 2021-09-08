var express = require('express')
var router = express.Router()
var path = require('path')
const authController = require('../controllers/authController')

const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })

/* GET users listing. */
router.post('/', upload.single('img'), authController.register)
router.post('/login', authController.login)

module.exports = router
