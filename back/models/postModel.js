const mongoose = require('../bin/mongodb')
const { Schema, Model } = mongoose

const commentSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
)

const postSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    text: {
      type: String,
    },
    file: {
      type: String,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    comments: [commentSchema],
  },
  { timestamps: true },
)
const postModel = new mongoose.model('post', postSchema)
module.exports = postModel
