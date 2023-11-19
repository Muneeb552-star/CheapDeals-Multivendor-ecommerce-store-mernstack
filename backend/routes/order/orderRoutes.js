const router = require('express').Router()
const orderController = require('../../controllers/order/orderController')

router.post('/order/place-order', orderController.placeOrder)
router.get('/customer/get-dashboard-data/:userId', orderController.get_customer_dashboard_data)
router.get('/customer/get-orders/:customerId/:status', orderController.get_orders)
router.get('/customer/get-order-details/:orderId', orderController.get_order_details)

module.exports = router