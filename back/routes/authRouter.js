var express = require('express')
var router = express.Router()
const authController = require('../controllers/authController')

/* GET users listing. */
router.post('/', authController.register)
router.post('/login', authController.login)

module.exports = router
