const router = require('express').Router()
const chatController = require('../controllers/chat/ChatController')
const authMiddleware = require("../middlewares/authMiddleware")

router.post('/chat/customer/add-customer-friend', chatController.add_customer_friend)

module.exports = router