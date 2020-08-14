// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for uploads
const Upload = require('../models/upload')
// const User = require('../models/user')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { upload: { title: '', text: 'foo' } } -> { upload: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /uploads
router.get('/uploads', (req, res, next) => {
  Upload.find().sort({ _id: -1 })
    .populate('owner')
    .then(uploads => {
      // `uploads` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return uploads.map(upload => upload.toObject())
    })
    // respond with status 200 and JSON of the uploads
    .then(uploads => res.status(200).json({ uploads: uploads }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// Carosel get recent uploads
router.get('/uploads/recent', (req, res, next) => {
  Upload.find().sort({ _id: -1 }).limit(5)
    .populate('owner')
    .then(uploadList => {
      res.json({ uploads: uploadList })
    })
})

// SHOW
// GET /uploads/5a7db6c74d55bc51bdf39793
router.get('/uploads/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Upload.findById(req.params.id)
    .populate('owner')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "upload" JSON
    .then(upload => res.status(200).json({ upload: upload.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE // this dead
// POST /uploads
router.post('/uploads', requireToken, (req, res, next) => {
  // set owner of new upload to be current user
  req.body.upload.owner = req.user.id

  Upload.create(req.body.upload)
    // respond to succesful `create` with status 201 and JSON of new "upload"
    .then(upload => {
      // userAddArt(req.user.id, upload)
      res.status(201).json({ upload: upload.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /uploads/5a7db6c74d55bc51bdf39793
router.patch('/uploads/:id/patch', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.owner

  Upload.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, upload)

      upload.name = req.body.name
      // pass the result of Mongoose's `.update` to the next `.then`
      // return upload.updateOne(req.body.upload)
      return upload.save()
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /uploads/5a7db6c74d55bc51bdf39793
router.delete('/uploads/:id', requireToken, (req, res, next) => {
  Upload.findById(req.params.id)
    .then(handle404)
    .then(upload => {
      // throw an error if current user doesn't own `upload`
      requireOwnership(req, upload)
      // delete the upload ONLY IF the above didn't throw
      upload.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

router.get('/uploads/user/:id', (req, res, next) => {
  Upload.find({ owner: req.params.id })
    .populate('owner')
    .then(uploadList => res.json({ uploads: uploadList }))
    .catch(next)
})

module.exports = router
