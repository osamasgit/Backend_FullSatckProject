const Part = require('../models/Part')

function calculateMaterials (part) {
  const totalMaterials = {}

  part.products.forEach(({ product, quantity: productQuantity }) => {
    product.materials.forEach(({ material, quantityPerUnit }) => {
      const totalQty = productQuantity * quantityPerUnit

      if (totalMaterials[material._id]) {
        totalMaterials[material._id].quantity += totalQty
      } else {
        totalMaterials[material._id] = {
          materialId: material._id,
          name: material.name,
          quantity: totalQty
        }
      }
    })
  })

  return Object.values(totalMaterials)
}

exports.calculateMaterialsAllParts = async (req, res) => {
  try {
    const parts = await Part.find().populate({
      path: 'products.product',
      populate: {
        path: 'materials.material',
        model: 'Material'
      }
    })

    const totalMaterialsMap = {}

    for (const part of parts) {
      const materials = calculateMaterials(part)

      for (const m of materials) {
        if (totalMaterialsMap[m.materialId]) {
          totalMaterialsMap[m.materialId].quantity += m.quantity
        } else {
          totalMaterialsMap[m.materialId] = { ...m }
        }
      }
    }

    const totalMaterialsList = Object.values(totalMaterialsMap).map(m => ({
      ...m,
      quantity: Math.ceil(m.quantity)
    }))

    res.json(totalMaterialsList)
  } catch (error) {
    res.status(500).json({ message: 'Error calculating materials', error: error.message })
  }
}
