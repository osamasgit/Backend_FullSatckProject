const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guests: { type: Number, required: true },

  parts: [
    {
      part: { type: mongoose.Schema.Types.ObjectId, ref: 'PartEvent', required: true }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)