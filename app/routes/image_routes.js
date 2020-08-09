const express = require('express')
const router = express.Router()
const fs = require('fs')
const Image = require('./../models/profileImg')

router.post('/api/photo', function (req, res) {
  const newItem = new Image()
  newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
  newItem.img.contentType = 'image/png'
  newItem.save()
})
module.export = router
