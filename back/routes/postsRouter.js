var express = require('express')
var router = express.Router()
var path = require('path')
const postController = require('../controllers/postController')

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
router.post('/', upload.single('img'), postController.create, (req, res) => {
  console.log('AAA')
  console.log(req.body)
  console.log('el archivo: ', req.file)
})
router.get('/', (req, res) => {
  res.send('In construction')
})
router.get('/profile', postController.getUserProfile)
router.get('/genericProfile/:username', postController.getGenericUserProfile)
router.get('/userHome', postController.getUserHome)
router.get('/like/:id', postController.likePost)
router.get('/unlike/:id', postController.unlikePost)
router.get('/checkLike/:id', postController.checkLike)
router.post('/comment', postController.comment)
// router.get('/:id', postController.getByUserID)

module.exports = router
