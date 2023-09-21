const router = require('express').Router()
const authMiddleware = require("../../middlewares/authMiddleware")
const productController = require('../../controllers/dashboard/productController')

router.post('/add-product', authMiddleware, productController.add_product)
router.get('/get-products', authMiddleware, productController.get_products)
router.get('/get-product/:productId', authMiddleware, productController.get_product)
router.post('/update-product', authMiddleware, productController.update_product)
router.post('/update-product-image', authMiddleware, productController.update_product_image)

module.exports = router