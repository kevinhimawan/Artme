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
// router.delete('/:id', destroyUser)

const { createUser, loginUser, deleteUser, getUser } = require('../controllers/login.routes')

router.post('/create',createUser)
router.post('/login', loginUser)
router.post('/delete',deleteUser)
router.get('/',getUser)

module.exports = router