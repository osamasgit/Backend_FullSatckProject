const express = require('express')
const router = express.Router()
const { calculateMaterialsAllParts } = require('../controllers/partController')

router.get('/calculateMaterials', calculateMaterialsAllParts)

module.exports = router