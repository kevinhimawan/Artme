const express = require('express')
const router = express.Router()
const { logIn, readAllUsers, destroyUser } = require('../controllers/login.routes')

// router.get('/', (req, res) => {
//   res.status(201).json({
//     message: 'login!'
//   })
// })

router.post('/', logIn)
router.get('/', readAllUsers)
router.delete('/:id', destroyUser)

module.exports = router