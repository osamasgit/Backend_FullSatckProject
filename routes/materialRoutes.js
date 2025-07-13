const express = require('express')
const router = express.Router()
const Material = require('../models/Material')
const crud = require('../controllers/crudGenericController')

router.post('/', crud.create(Material))
router.get('/', crud.getAll(Material))
router.get('/:id', crud.getOne(Material))
router.put('/:id', crud.update(Material))
router.delete('/:id', crud.remove(Material))

module.exports = router