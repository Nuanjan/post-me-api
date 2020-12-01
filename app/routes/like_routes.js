const express = require('express')
const router = express.Router()
// require post model
const Post = require('./../models/post')
// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// CREATE
// POST /likes/
router.post('/likes', (req, res, next) => {
  // get the like data from the body of the request
  const likeData = req.body.like
  console.log(req.body.like)
  // get the post id from the body
  const postId = likeData.postId
  // find the post by its id
  Post.findById(postId)
    .then(handle404)
    .then(post => {
      // add like data when user click like to post
      likeData.liketerCustom = req.body.like.liketer
      post.likes.push(likeData)
      console.log(post.likes, 'this is post like Array')
      // save post
      return post.save()
    })
    // send responsne back to client
    .then(post => res.status(201).json({post: post}))
    .catch(next)
})

// // DESTROY
// // DELETE /likes/:id
// router.delete('/likes/:id', (req, res, next) => {
//   const likeId = req.params.id
//   Post.findOne({ 'likes._id': likeId })
//     .then(handle404)
//     .then(post => {
//       post.likes.id(likeId).remove()
//       return post.save()
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

// UPDATE
// PATCH /likes/:id
router.patch('/likes/:id', (req, res, next) => {
  const likeId = req.params.id
  const likeData = req.body.like
  Post.findOne({
    'likes._id': likeId
  })
    .then(handle404)
    .then(post => {
      const like = post.likes.id(likeId)
      like.set(likeData)
      return post.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
