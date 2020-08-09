const express = require('express')
const router = express.Router()
const Image = require('./../models/profileImg')
const path = require('path')

// const uploadPath = path.resolve(__dirname, './../../post-me-client/public/uploads')
router.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({msg: 'No file uploades'})
  }
  const file = req.files.file
  file.mv(path.resolve(`/Users/noon/sei/projects/post-me/post-me-client/public/uploads/${file.name}`), err => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    } else {
      res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
    }
    Image.create({
      imgName: file.name,
      imgPath: `/uploads/${file.name}`
    })
  })
})
module.exports = router
