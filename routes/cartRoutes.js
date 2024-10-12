const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

// Get user's cart
router.get('/', authMiddleware, cartController.getCart);

// Add a product to the cart
router.post('/', authMiddleware, cartController.addToCart);

// Remove a product from the cart
router.delete('/:productId', authMiddleware, cartController.removeFromCart);

module.exports = router;
