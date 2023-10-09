const mongoose = require('mongoose')

const sellerCustomerSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  receiverId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "unseen"
  },
}, { timestamps: true })

module.exports = mongoose.model('seller_customer_messages', sellerCustomerSchema)