const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  commenter: {
    // References use the type ObjectId
    type: mongoose.Schema.Types.ObjectId,
    // the name of the model to which they refer
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = commentSchema
