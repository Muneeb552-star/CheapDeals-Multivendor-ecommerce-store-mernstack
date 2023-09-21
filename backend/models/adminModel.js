const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  image: {
    type: String,
    default: true
  },
  role: {
    type: String,
    default: 'admin'
  }
})


// ProductSchema.virtual('id').get(function () {
//   return this._id.toHexString()
// })

// ProductSchema.set('toJSON', {
//   virtuals: true
// })
module.exports = mongoose.model('Admins', adminSchema)