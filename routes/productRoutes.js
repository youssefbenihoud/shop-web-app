const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const { adminAuth } = require('../middleware/auth'); // Middleware to check if user is an admin
const { createProduct, getAllProducts } = require('../controllers/productController');

// Route to create a new product (accessible by admins only)
router.post('/products', adminAuth, createProduct);

// Route to get all products (public)
router.get('/products', getAllProducts);

router.get('/', productController.getAllProducts);
//router.post('/', authMiddleware, productController.addProduct);
//router.put('/:id', authMiddleware, productController.updateProduct);
//router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
