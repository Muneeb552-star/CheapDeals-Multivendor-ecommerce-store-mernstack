const router = require('express').Router()
const cartController = require('../../controllers/home/cartController')

router.get('/product/get-cart-products/:userId', cartController.getCartProducts)
router.get('/product/get-wishlist-products/:userId', cartController.get_wishlist_products)

router.post('/product/add-to-cart', cartController.add_to_cart)
router.post('/product/add-to-wishlist', cartController.add_to_wishlist)

router.delete('/product/delete-cart-product/:cartId', cartController.delete_cart_products)
router.delete('/product/delete-wishlist-product/:wishlistId', cartController.delete_wishlist_product)

router.put('/product/increase-cart-quantity/:cartId', cartController.increase_cart_quantity)
router.put('/product/decrease-cart-quantity/:cartId', cartController.decrease_cart_quantity)

module.exports = router
