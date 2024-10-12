import React, { useEffect, useState } from 'react';
import { getCartItems, addToCart } from '../services/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await getCartItems(token);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items', error);
      }
    }

    if (token) {
      fetchCartItems();
    }
  }, [token]);

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    try {
      await addToCart(token, productId, quantity);
      alert('Cart updated successfully!');
      // Refresh cart items after updating
      const response = await getCartItems(token);
      setCartItems(response.data);
    } catch (error) {
      alert('Error updating cart. Please try again.');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      // Remove product by setting its quantity to 0
      await addToCart(token, productId, -9999); // Use a very large negative quantity to ensure it's removed
      alert('Product removed from cart.');
      // Refresh cart items after removing
      const response = await getCartItems(token);
      setCartItems(response.data);
    } catch (error) {
      alert('Error removing product from cart. Please try again.');
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product._id}>
              <div>
                {item.product.name} - Quantity: {item.quantity}
                <div>
                  <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>
                    +
                  </button>
                  <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}>
                    -
                  </button>
                  <button onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
