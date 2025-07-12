const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  materials: [
    {
      material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
      quantityPerUnit: { type: Number, required: true }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
