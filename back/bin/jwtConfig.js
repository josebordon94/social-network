const jwt = require('jsonwebtoken')
const { rawListeners } = require('../app')

const secretKey = 'mySocialNetwork1234'

function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token']?.split(' ')[1]
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err)
        return res.status(403).json({
          isLoggedIn: false,
          message: 'Failed to authenticate',
        })
      req.user = {}
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  } else {
    res.status(403).json({ msg: 'Invalid token', isLoggedIn: false })
  }
}

module.exports = {
  secretKey: secretKey,
  verifyJWT: verifyJWT,
}
