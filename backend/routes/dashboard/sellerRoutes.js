const router = require('express').Router()
const authMiddleware = require("../../middlewares/authMiddleware")
const sellerController = require('../../controllers/dashboard/sellerController')

router.get('/get-seller-requests', authMiddleware, sellerController.getSellerRequests)
router.get('/get-sellers', authMiddleware, sellerController.getActiveSellers)
router.get('/get-seller/:sellerId', authMiddleware, sellerController.getSeller)
router.post('/seller-status-update', authMiddleware, sellerController.updateSellerStatus)

module.exports = router