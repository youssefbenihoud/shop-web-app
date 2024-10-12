import React, { useState } from 'react';
import { createProduct } from '../services/api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import FeedbackSnackbar from '../components/FeedbackSnackbar';

function AdminProductManagement() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setSnackbar({
          open: true,
          message: 'You must be logged in as an admin to create products',
          severity: 'error',
        });
        return;
      }

      await createProduct({ name, price, description }, token);
      setSnackbar({
        open: true,
        message: 'Product created successfully!',
        severity: 'success',
      });

      // Clear the form fields after successful submission
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error creating product. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Admin - Create Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Create Product
          </Button>
        </form>
      </Box>
      <FeedbackSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Container>
  );
}

export default AdminProductManagement;
