const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: {}
  },
  rating: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

module.exports = mongoose.model('wishlists', wishlistSchema)