import axios from 'axios';

const API_URL = 'https://shop-web-application.onrender.com';


// Create a product (admin only)
export const createProduct = async (productData, token) => {
  return await axios.post(`${API_URL}/products`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Register a new user
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};

// Login user
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/users/login`, userData);
};

// Get all products
export const getAllProducts = async () => {
  return await axios.get(`${API_URL}/products`);
};

// Add a product to cart
export const addToCart = async (token, productId, quantity) => {
  return await axios.post(`${API_URL}/cart`, { productId, quantity }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Get cart items
export const getCartItems = async (token) => {
  return await axios.get(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Create an order
export const createOrder = async (token) => {
  return await axios.post(`${API_URL}/orders`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Get all orders
export const getOrders = async (token) => {
  return await axios.get(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Get all users (admin only)
export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  return await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update user role (admin only)
export const updateUserRole = async (userId, isAdmin) => {
  const token = localStorage.getItem('token');
  return await axios.put(
    `${API_URL}/users/role`,
    { userId, isAdmin },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Delete user (admin only)
export const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');
  return await axios.delete(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};