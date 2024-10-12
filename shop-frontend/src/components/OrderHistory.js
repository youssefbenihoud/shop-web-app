import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await getOrders(token);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    }

    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body1">You have no past orders.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <ListItem key={order._id}>
              <ListItemText
                primary={`Order Date: ${new Date(order.createdAt).toLocaleString()}`}
                secondary={`Total Amount: $${order.totalAmount}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default OrderHistory;
