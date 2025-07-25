const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Material', materialSchema)