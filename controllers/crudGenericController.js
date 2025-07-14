exports.create = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.body)
    res.status(201).json(doc)
  } catch (err) {
    res.status(400).json({ message: 'Error creating', error: err.message })
  }
}

exports.getAll = (Model) => async (req, res) => {
  try {
    let query = Model.find()

    if (Model.modelName === 'Part') {
      query = query.populate({
        path: 'products.product',
        populate: {
          path: 'materials.material',
          model: 'Material'
        }
      })
    } else if (Model.modelName === 'Product') {
      query = query.populate('materials.material')
    }

    const docs = await query
    res.json(docs)
  } catch (err) {
    res.status(500).json({ message: 'Error getting data' })
  }
}


exports.getOne = (Model) => async (req, res) => {
  try {
    let query = Model.findById(req.params.id)

    if (Model.modelName === 'Part') {
      query = query.populate({
        path: 'products.product',
        populate: {
          path: 'materials.material',
          model: 'Material'
        }
      })
    } else if (Model.modelName === 'Product') {
      query = query.populate('materials.material')
    }

    const item = await query

    if (!item) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: 'Error getting it', error })
  }
}

exports.update = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(doc)
  } catch (err) {
    res.status(400).json({ message: 'Error updating', error: err.message })
  }
}

exports.remove = (Model) => async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted succesfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting' })
  }
}
