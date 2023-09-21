const router = require('express').Router()
const authController = require('../controllers/authController')
const authMiddleware = require("../middlewares/authMiddleware")

router.post('/admin-login', authController.admin_login)
router.get('/get-user', authMiddleware, authController.getUserInfo)
router.post('/seller-register', authController.seller_register)
router.post('/seller-login', authController.seller_login)
router.post('/profile-image-upload', authMiddleware, authController.seller_login)
router.post('/update-profile', authMiddleware, authController.update_profile)

module.exports = router