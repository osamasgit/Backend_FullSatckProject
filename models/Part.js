const mongoose = require('mongoose')

const partSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guests: { type: Number },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Part', partSchema)