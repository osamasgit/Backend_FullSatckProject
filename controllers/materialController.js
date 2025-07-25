const Product = require('../models/Product')

const calculateMaterialsFromProducts = async (req, res) => {
  try {
    const { guests, products } = req.body

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'products must be array' })
    }

    const materialMap = {}

    for (const { productId } of products) {
      const product = await Product.findById(productId).populate('materials.material')
      if (!product) continue

      for (const mat of product.materials) {
        const materialId = mat.material._id.toString()
        const unitsPerGuest = mat.quantity || 1
        const total = guests * unitsPerGuest

        if (materialMap[materialId]) {
          materialMap[materialId].quantity += total
        } else {
          materialMap[materialId] = {
            material: mat.material,
            quantity: total,
          }
        }
      }
    }

    res.json(Object.values(materialMap))

  } catch (error) {
    console.error('Error calculating materials:', error)
    res.status(500).json({ error: 'Error internal server' })
  }
}

module.exports = {
  calculateMaterialsFromProducts
}