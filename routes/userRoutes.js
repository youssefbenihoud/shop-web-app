const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  userController.registerUser
);

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  userController.loginUser
);

module.exports = router;
