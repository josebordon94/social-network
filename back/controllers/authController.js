const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const jwtConfig = require('../bin/jwtConfig')
const userModel = require('../models/userModel')

var path = require('path')

const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

module.exports = {
  login: async function (req, res, next) {
    const userLoggingIn = req.body
    console.log('Logging in: ', userLoggingIn)
    try {
      const user = await userModel.findOne({ username: userLoggingIn.username })
      if (!user) {
        res.status(403).json({ msg: "User doesn't exist" })
      }
      const validPw = await bcrypt.compare(
        userLoggingIn.password,
        user.password,
      )
      console.log('Valid pw: ', validPw)
      if (validPw) {
        const payload = {
          id: user._id,
          username: user.username,
        }
        jwt.sign(
          payload,
          jwtConfig.secretKey,
          { expiresIn: 86400 },
          (err, token) => {
            if (err) return res.json({ msg: err })
            return res.json({
              msg: 'Success',
              token: 'Bearer ' + token,
            })
          },
        )
      } else {
        return res.status(403).json({ msg: 'Incorrect password' })
      }
    } catch (error) {}
  },
  register: async function (req, res, next) {
    const user = req.body
    console.log('User for register: ', user)
    //check username already exist
    try {
      const takenUserName = await userModel.findOne({
        username: req.body.username,
      })
      if (takenUserName) {
        res.json({ msg: 'Username already exist' })
      } else {
        user.password = await bcrypt.hash(req.body.password, 10)
        const newUser = new userModel({
          username: user.username,
          password: user.password,
          name: user.name,
          lastname: user.lastname,
          description: user.description,
          photo: req.file.filename,
        })
        await newUser.save()
        res.json({ msg: 'success' })
      }
    } catch (error) {
      console.log(error)
      res.json('Bad data')
    }
  },
}
