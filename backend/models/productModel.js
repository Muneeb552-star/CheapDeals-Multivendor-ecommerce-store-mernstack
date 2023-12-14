const mongoose = require('mongoose')
const { schema } = require('./categoryModel')

const productSchema = new mongoose.Schema({
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
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
    category: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true 
    },
    discount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    shopName: {
      type: String,
      default: true
    },
    images: {
      type: Array,
      default: {}
    },
    rating: {
      type: Number,
      default: 0
    }
}, { timestamps: true })


productSchema.index({
    name: 'text',
    category: 'text',
    brand: 'text',
    description: 'text'
  }, {
    weights: {
      name: 5,
      category: 4,
      brand: 3,
      description: 2
    }
})

module.exports = mongoose.model('products', productSchema)