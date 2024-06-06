const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  review: String,
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Places' }
})

module.exports = mongoose.model('Reviews', ReviewSchema)
