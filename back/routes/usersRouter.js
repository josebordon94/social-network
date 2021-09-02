var express = require('express')
var router = express.Router()
const userController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', userController.getAll)
router.post('/', userController.create)
router.post('/login', userController.login)

module.exports = router
