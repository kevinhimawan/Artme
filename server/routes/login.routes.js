const express = require('express')
const router = express.Router()

const { createUser, loginUser, deleteUser, getUser } = require('../controllers/login.controller')

router.get('/',getUser)
router.post('/create',createUser)
router.post('/login', loginUser)
router.post('/delete',deleteUser)


module.exports = router