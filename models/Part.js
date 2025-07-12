const mongoose = require('mongoose')

const partEventSchema = new mongoose.Schema({
  name: { type: String, required: true },

  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('PartEvent', partEventSchema)