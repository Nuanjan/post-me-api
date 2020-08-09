const mongoose = require('mongoose')
const profileImgSchema = new mongoose.Schema({
  imgName: {
    // data type is Buffer , to allows to store imgs as data in the form of Arrays.
    type: String,
    required: true
  },
  imgPath: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Image', profileImgSchema)
