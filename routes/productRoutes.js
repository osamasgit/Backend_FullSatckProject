const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const crud = require('../controllers/crudGenericController')

router.post('/', crud.create(Product))
router.get('/', crud.getAll(Product, 'materials.material'))
router.get('/:id', crud.getOne(Product, 'materials.material'))
router.put('/:id', crud.update(Product))
router.delete('/:id', crud.remove(Product))

module.exports = router
