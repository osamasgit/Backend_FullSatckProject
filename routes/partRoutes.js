const express = require('express')
const router = express.Router()
const Part = require('../models/Part')
const crud = require('../controllers/crudGenericController')
const partController = require('../controllers/partController')

router.get('/calculateMaterials', partController.calculateMaterialsAllParts)

router.post('/', crud.create(Part))
router.get('/', crud.getAll(Part))
router.get('/:id', crud.getOne(Part))
router.put('/:id', crud.update(Part))
router.delete('/:id', crud.remove(Part))


module.exports = router

