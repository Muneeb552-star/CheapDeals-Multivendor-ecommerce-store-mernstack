const router = require('express').Router()
const authMiddleware = require("../../middlewares/authMiddleware")
const categoryController = require('../../controllers/dashboard/categoryController')

router.post('/add-category', authMiddleware, categoryController.add_category)
router.get('/get-categories', authMiddleware, categoryController.get_categories)

module.exports = router