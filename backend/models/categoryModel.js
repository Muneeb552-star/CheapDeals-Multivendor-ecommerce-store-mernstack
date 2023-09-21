const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
  
}, { timestamps: true })


categorySchema.index({
  name: 'text'
})

module.exports = mongoose.model('categories', categorySchema)