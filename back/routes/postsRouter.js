var express = require('express')
var router = express.Router()
const authController = require('../controllers/authController')

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Holi esto es privilegiado')
})

module.exports = router
