const mongoose = require('mongoose')

const customerOrder = new mongoose.Schema({
  customerId: {
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
    type: Object,
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


module.exports = mongoose.model('customerOrders', customerOrder)