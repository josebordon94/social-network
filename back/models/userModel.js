const mongoose = require('../bin/mongodb')
const { Schema, Model } = mongoose

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 5,
      maxlength: 40,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    lastname: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    following: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    photo: { type: String, required: true },
  },
  { timestamps: true },
)
const userModel = new mongoose.model('user', userSchema)
module.exports = userModel
