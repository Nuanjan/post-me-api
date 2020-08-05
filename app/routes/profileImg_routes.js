const express = require('express')
const passport = require('passport')
const multer = require('multer')

// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
const storege = multer.diskStorage({
  
})

router.post('./upload', requireToken, (req, res, next) => {
  if (req.files == null) {
    return res.status(400).json({msg: 'No file uploaded'})
  }
  const file = req.files.file
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }
    res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
  })
})
module.exports = router
