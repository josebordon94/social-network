const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const jwtConfig = require('../bin/jwtConfig')
const userModel = require('../models/userModel')

module.exports = {
  create: async function (req, res, next) {
    console.log('Adding user: ', req.body)
    try {
      let user = new userModel({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
      })
      await user.save()
      res.json(user)
    } catch (error) {
      res.send(error)
    }
  },
  login: async function (req, res, next) {
    const userLoggingIn = req.body
    console.log('Logging in: ', userLoggingIn)
    try {
      const user = await userModel.findOne({ username: userLoggingIn.username })
      if (!user) {
        res.json({ msg: 'Invalid data for login' })
      }
      const validPw = bcrypt.compare(userLoggingIn.password, user.password)
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
        return res.json({ msg: 'Invalid login data' })
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
