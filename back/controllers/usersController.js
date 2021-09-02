const userModel = require('../models/userModel')
const jwt = require('jwt-simple')
const jwtConfig = require('../bin/jwtConfig')

module.exports = {
  getAll: async function (req, res, next) {
    const users = await userModel.find()
    res.json(users)
  },
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
    try {
      const payload = req.body
      const token = jwt.encode(payload, jwtConfig.secretKey)
      const user = await userModel.findOne({ username: req.body.username })
      console.log(user)
      if (user === null) {
        res.json({ error: true, msg: "User doesn't exist" })
      }
      if (req.body.password !== user.password) {
        res.json({ error: true, msg: 'Invalid password' })
      }
      res.json({ error: false, token: token })
    } catch (error) {
      res.json({ error: true, msg: 'Error in login' })
    }
  },
}
