const router = require('express').Router()
const authMiddleware = require("../../middlewares/authMiddleware")
const productController = require('../../controllers/dashboard/productController')

router.post('/add-product', authMiddleware, productController.addProduct)
router.get('/get-products', authMiddleware, productController.getProducts)
router.get('/get-product/:productId', authMiddleware, productController.getProduct)
router.post('/update-product', authMiddleware, productController.updateProduct)
router.post('/update-product-image', authMiddleware, productController.updateProductImage)

module.exports = router