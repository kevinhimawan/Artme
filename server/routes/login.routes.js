const express = require('express')
const router = express.Router()
const { signIn } = require('../controllers/login.routes')

router.get('/', (req, res) => {
  res.status(201).json({
    message: 'login!'
  })
})

router.post('/', signIn)
module.exports = router