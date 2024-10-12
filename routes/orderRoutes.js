const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Create an order
router.post('/', authMiddleware, orderController.createOrder);

// Get user's orders
router.get('/', authMiddleware, orderController.getOrders);

module.exports = router;
