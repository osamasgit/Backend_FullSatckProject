const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unitsPerGuest: { type: Number, default: 1 },
  materials: [
    {
      material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
      quantity: { type: Number, required: true }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)