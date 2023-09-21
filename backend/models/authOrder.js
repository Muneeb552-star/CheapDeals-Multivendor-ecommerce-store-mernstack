const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true 
  },
  payment_status: {
    type: String,
    required: true 
  },
  shippingInfo: {
    type: String,
    required: true 
  },
  delivery_status: {
    type: String,
    required: true 
  },
  date: {
    type: String,
    required: true 
  },
}, { timestamps: true })


module.exports = mongoose.model('authorOrders', authorSchema)