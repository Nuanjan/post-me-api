const express = require('express')

const Upload = require('../models/upload')

const s3Upload = require('../../lib/aws-s3-upload')

// multer stuff
const multer = require('multer')
const upload = multer({ dest: 'public/' })

const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

const randomChars = num => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = '-'
  for (let i = 0; i < num; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

router.post('/post-upload', requireToken, upload.single('image'), (req, res, next) => {
  s3Upload(req.file, req.body.name + randomChars(16))
    .then((data) => {
      return Upload.create({
        name: req.body.name,
        imageUrl: data.Location,
        owner: req.user.id
      })
    })
    .then(upload => res.status(201).json({ upload: upload.toObject() }))
    .catch(next)
})

// Bonus
router.get('/get-upload', (req, res, next) => {
  Upload.find()
    .populate('owner')
    .then(uploads => {
      return uploads.map(upload => upload.toObject())
    })
    .then(uploads => res.status(200).json({ uploads: uploads }))
    .catch(next)
})

module.exports = router
