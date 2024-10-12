import React, { useEffect, useState } from 'react';
import { getCartItems } from '../services/api';

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

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product._id}>
              {item.product.name} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
