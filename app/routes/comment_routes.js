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
// POST /comments/
router.post('/comments', (req, res, next) => {
  // get the comment data from the body of the request
  const commentData = req.body.comment
  // get the post id from the body
  const postId = commentData.postId
  // find the post by its id
  Post.findById(postId)
    .then(handle404)
    .then(post => {
      // add comment to post
      post.comments.push(commentData)
      // save post
      return post.save()
    })
    // send responsne back to client
    .then(post => res.status(201).json({post: post}))
    .catch(next)
})
// DESTROY
// DELETE /comments/:id
router.delete('/comments/:id', (req, res, next) => {
  const commentId = req.params.id
  Post.findOne({ 'comments._id': commentId })
    .then(handle404)
    .then(post => {
      post.comments.id(commentId).remove()
      return post.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// UPDATE
// PATCH /comments/:id
router.patch('/comments/:id', (req, res, next) => {
  const commentId = req.params.id
  const commentData = req.body.comment
  console.log(commentData)
  Post.findOne({
    'comments._id': commentId
  })
    .then(handle404)
    .then(post => {
      const comment = post.comments.id(commentId)
      comment.set(commentData)
      return post.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
