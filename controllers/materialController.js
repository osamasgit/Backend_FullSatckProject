const Material = require('../models/Material')

const createMaterial = async (req, res) => {
  try {
    const { name } = req.body
    const material = new Material({ name })
    await material.save()
    res.status(201).json(material)
  } catch (error) {
    res.status(500).json({ message: 'Error creating material' })
  }
}

const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
    res.status(200).json(materials)
  } catch (error) {
    res.status(500).json({ message: 'Error getting materials' })
  }
}


const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body
    const updated = await Material.findByIdAndUpdate(id, { name }, { new: true })
    if (!updated) return res.status(404).json({ message: 'Material not found' })
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Error updating material' })
  }
}

const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Material.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Material not found' })
    res.status(200).json({ message: 'Material deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting material' })
  }
}

module.exports = {
  createMaterial,
  getMaterials,
  updateMaterial,
  deleteMaterial
}
