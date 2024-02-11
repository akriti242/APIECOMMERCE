const express = require('express')
const { getAllUser } = require('../controllers/UserController')
const UserController = require('../controllers/UserController')
const router = express.Router()

//usercontroller
router.get('/getalluser', UserController.getalluser)

router.post('/userinsert', UserController.userInsert)




module.exports = router