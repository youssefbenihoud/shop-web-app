import React, { useEffect, useState } from 'react';
import { getCartItems, createOrder } from '../services/api';
import { Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import FeedbackSnackbar from '../components/FeedbackSnackbar';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

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

  const handlePlaceOrder = async () => {
    try {
      await createOrder(token);
      //alert('Order placed successfully!');
      setSnackbar({
        open: true,
        message: 'Order placed successfully!',
        severity: 'success',
      });
      setCartItems([]); // Clear cart after placing order
    } catch (error) {
      //alert('Error placing order. Please try again.');
      setSnackbar({
        open: true,
        message: 'Order failed. Please try again!',
        severity: 'error',
      });

    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.product._id}>
                <ListItemText
                  primary={item.product.name}
                  secondary={`Quantity: ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handlePlaceOrder(item.product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;
