var mongoose = require('mongoose')
let dataBaseName = 'socialNetworkDB'
let direccion = 'mongodb://localhost/' + dataBaseName
mongoose.connect(direccion, { useNewUrlParser: true }, function (error) {
  if (error) {
    throw error
  } else {
    console.log('Successfully connected to ' + dataBaseName)
  }
})

module.exports = mongoose
