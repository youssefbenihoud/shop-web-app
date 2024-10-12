import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import FeedbackSnackbar from '../components/FeedbackSnackbar';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      // alert('Registration successful! Please log in.');
      setSnackbar({
        open: true,
        message: 'Registration successful! Please log in',
        severity: 'success',
      });
    } catch (error) {
      // alert('Error registering user. Please try again.');
      setSnackbar({
        open: true,
        message: 'Error logging in. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Register;
