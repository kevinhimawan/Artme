const express = require('express')
const router = express.Router()

const { createUser, loginUser, deleteUser, getUser } = require('../controllers/login.routes')

router.post('/create',createUser)
router.post('/login', loginUser)
router.post('/delete',deleteUser)
router.get('/',getUser)

module.exports = router