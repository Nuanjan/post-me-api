const mongoose = require('mongoose')
const commentSchema = require('./comment')

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
