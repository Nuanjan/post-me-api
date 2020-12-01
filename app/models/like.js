const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
  likeStatus: {
    type: Boolean,
    default: true,
    required: true
  },
  liketer: {
    // References use the type ObjectId
    type: mongoose.Schema.Types.ObjectId,
    // the name of the model to which they refer
    ref: 'User'
  }
}, {
  timestamps: true
})
module.exports = likeSchema
