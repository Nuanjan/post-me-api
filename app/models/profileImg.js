const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Image Schema for storing images in the mogodb
const ImageSchema = Schema({
  imageName: {
    type: String,
    default: 'none',
    require: true
  },
  imageData: {
    type: String,
    require: true
  }
})
module.exports = mongoose.model('Image', ImageSchema)
