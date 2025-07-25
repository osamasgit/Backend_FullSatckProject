const express = require('express')
const router = express.Router()
const PartProduct = require('../models/PartProduct')

router.post('/', async (req, res) => {
  const { partId, productId, unitsPerGuest } = req.body

  try {
    const existing = await PartProduct.findOne({ part: partId, product: productId })
    if (existing) return res.status(400).json({ error: 'Product already added to this part' })

    const newRelation = await PartProduct.create({ part: partId, product: productId, unitsPerGuest })
    res.json(newRelation)
  } catch (err) {
    res.status(500).json({ error: 'Error adding product to part' })
  }
})

module.exports = router