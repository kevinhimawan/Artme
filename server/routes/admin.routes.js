const express = require('express')
const router = express.Router()

const {createCategory, getCategory} = require('../controllers/admin.controller')

router.post('/categoryCreate', createCategory)
router.get('/getcategory', getCategory)

module.exports = router