const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
  like: {
    type: Number,
    default: 0,
    min: 0,
    max: 1,
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
