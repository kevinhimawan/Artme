const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/login.routes')

// router.get('/', (req, res) => {
//   res.status(201).json({
//     message: 'login!'
//   })
// })

router.post('/', createUser)

module.exports = router