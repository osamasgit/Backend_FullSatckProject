const mongoose = require('mongoose')

const partProductSchema = new mongoose.Schema({
  part: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  unitsPerGuest: { type: Number, required: true }
})

module.exports = mongoose.model('PartProduct', partProductSchema)