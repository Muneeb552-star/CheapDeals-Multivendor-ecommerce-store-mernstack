const router = require('express').Router()
const authMiddleware = require("../../middlewares/authMiddleware")
const sellerController = require('../../controllers/dashboard/sellerController')

router.get('/get-seller-requests', authMiddleware, sellerController.get_seller_requests)
router.get('/get-seller/:sellerId', authMiddleware, sellerController.get_seller)
router.post('/seller-status-update', authMiddleware, sellerController.seller_status_update)

module.exports = router