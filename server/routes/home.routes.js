const express = require('express')
const router = express.Router()

const { createPost, showAllPost } = require('../controllers/home.controller')

router.post('/createpost', createPost)
router.get('/', showAllPost)

module.exports = router