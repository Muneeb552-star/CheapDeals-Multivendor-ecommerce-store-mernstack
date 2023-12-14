const router = require('express').Router()
const homeController = require('../../controllers/home/homeController')

router.get('/get-categories', homeController.get_categories)
router.get('/get-products', homeController.get_products)
router.get('/get-product/:slug', homeController.get_product)
router.get('/product-price-range', homeController.product_price_range)
router.get('/filter-products', homeController.filter_products)
router.get('/customer/get-reviews/:productId', homeController.getReviews)

router.post('/customer/submit-review', homeController.submit_review)

module.exports = router