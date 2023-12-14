const router = require('express').Router()
const chatController = require('../controllers/chat/ChatController')

router.post('/chat/customer/add-customer-friend', chatController.add_customer_friend)
router.post('/chat/customer/send-message-to-seller', chatController.send_customer_message)

module.exports = router