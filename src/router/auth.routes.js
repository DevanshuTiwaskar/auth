const express = require('express')
const router = express.Router()
const authConroller = require("../controllers/auth.controller")


router.post('/user/register',authConroller.registerUser)
router.post('/user/login',authConroller.loginUser)
router.post('/seller/register',authConroller.registerSeller)
router.post('/seller/login',authConroller.loginUser)


module.exports = router