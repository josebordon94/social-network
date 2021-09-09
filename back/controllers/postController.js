const { post } = require('../app')
const postModel = require('../models/postModel')
const userModel = require('../models/userModel')

module.exports = {
  create: async function (req, res, next) {
    console.log('Post to upload: ', req.body)
    console.log('el archivo: ', req.file)
    //check username already exist
    try {
      console.log(req.user)
      const newPost = new postModel({
        user: req.user.id,
        text: req.body.text,
        file: req.file.filename,
      })
      await newPost.save()
      res.json({ msg: 'success' })
    } catch (error) {
      console.log(error)
      res.json('Bad data')
    }
  },
  getUserProfile: async function (req, res) {
    console.log(req.user)
    try {
      posts = await postModel
        .find({ user: req.user.id })
        .populate({
          path: 'comments',
          populate: { path: 'user', model: 'user' },
        })
        .sort({ createdAt: 'desc' })
        .exec()
      user = await userModel.findById(req.user.id)
      const response = { posts, user }
      console.log(response)
      res.json(response)
    } catch (error) {
      console.error(error)
    }
  },
  getGenericUserProfile: async function (req, res) {
    console.log('Searching profile of ', req.username)
    user = await userModel.findOne({ username: req.params.username })
    console.log('USER: ', user)
    try {
      posts = await postModel
        .find({ user: user._id })
        .populate({
          path: 'comments',
          populate: { path: 'user', model: 'user' },
        })
        .sort({ createdAt: 'desc' })
        .exec()
      const response = { posts, user }
      console.log(response)
      res.json(response)
    } catch (error) {
      console.error(error)
    }
  },
  getUserHome: async function (req, res) {
    console.log(req.user)
    try {
      posts = await postModel
        .find({ user: { $ne: req.user.id } })
        .populate('user')
        .populate({
          path: 'comments',
          populate: { path: 'user', model: 'user' },
        })
        .sort({ createdAt: 'desc' })
        .exec()
      res.json(posts)
    } catch (error) {
      console.error(error)
    }
  },
  comment: async function (req, res) {
    console.log(req.user)
    console.log(req.body)
    const comment = {
      user: req.user.id,
      text: req.body.text,
    }
    console.log('Comment: ', comment)
    try {
      const result = await postModel.updateOne(
        { _id: req.body.post },
        { $push: { comments: comment } },
      )
      console.log('POST: ', result)
      res.json(result)
    } catch (error) {
      console.log(error)
    }
  },
  likePost: async function (req, res) {
    try {
      const result = await postModel.updateOne(
        { _id: req.params.id },
        { $addToSet: { likes: req.user.id } },
      )
      console.log('Adding like: ', result)
      res.json(result)
    } catch (error) {
      console.log(error)
    }
  },
  unlikePost: async function (req, res) {
    try {
      const result = await postModel.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.user.id } },
      )
      console.log('Substracting like: ', result)
      res.json(result)
    } catch (error) {
      console.log(error)
    }
  },
  checkLike: async function (req, res) {
    try {
      console.log(req.params.id)
      const post = await postModel.findById(req.params.id)
      const result = post.likes.includes(req.user.id)
      res.json(result)
    } catch (error) {
      console.log(error)
    }
  },
}
