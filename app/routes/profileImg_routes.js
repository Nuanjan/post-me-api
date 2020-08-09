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
  req.body = file
  file.mv(path.resolve(`/Users/noon/sei/projects/post-me/post-me-client/public/uploads/${file.name}`), err => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    } else {
      Image.create({
        imgName: req.body.name,
        imgPath: `/uploads/${req.body.name}`
      })
      res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
    }
    console.log(file.name)
    console.log(JSON.stringify(Image, null, 4))
  })
})

router.get('/inputFile', (req, res) => {
  res.render('inputt')
})
module.exports = router
