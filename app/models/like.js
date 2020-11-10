const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
  like: {
    type: Boolean,
    default: false,
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
module.export = likeSchema
