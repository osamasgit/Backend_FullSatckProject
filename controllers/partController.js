const Part = require('../models/Part')
const Product = require('../models/Product')

exports.addProductToPart = async (req, res) => {
  try {
    const { partId, productId } = req.body

    const part = await Part.findById(partId)
    if (!part) return res.status(404).json({ message: 'Part not found' })

    const product = await Product.findById(productId).populate('materials.material')
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const guests = part.guests || 0
    const quantityPerUnit = product.materials[0]?.quantityPerUnit || 1
    const productQuantity = Math.ceil(guests * quantityPerUnit)

    const alreadyAdded = part.products.some(p => p.product.toString() === productId)
    if (alreadyAdded) {
      return res.status(400).json({ message: 'Product already added to this part' })
    }

    part.products.push({ product: productId, quantity: productQuantity })
    await part.save()

    res.status(201).json({
      product: {
        _id: product._id,
        name: product.name,
        quantity: productQuantity,
        materials: product.materials
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to part', error: error.message })
  }
}

function calculateMaterials (part, guests) {
  const totalMaterials = {}

  part.products.forEach(({ product }) => {
    const calculatedQuantity = (product.unitsPerGuest) * guests

    product.materials.forEach(({ material, quantityPerUnit }) => {
      const totalQty = calculatedQuantity * quantityPerUnit

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
    const guests = Number(req.query.guests)

    const parts = await Part.find().populate({
      path: 'products.product',
      populate: {
        path: 'materials.material',
        model: 'Material'
      }
    })

    const totalMaterialsMap = {}

    for (const part of parts) {
      const materials = calculateMaterials(part, guests)

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