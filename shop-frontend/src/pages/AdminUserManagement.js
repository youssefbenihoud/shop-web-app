import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../services/api';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import FeedbackSnackbar from '../components/FeedbackSnackbar';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRoleChange = async (userId, isAdmin) => {
    try {
      await updateUserRole(userId, !isAdmin);
      setSnackbar({
        open: true,
        message: `User role updated successfully.`,
        severity: 'success',
      });
      fetchUsers();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error updating user role. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setSnackbar({
        open: true,
        message: 'User deleted successfully.',
        severity: 'success',
      });
      fetchUsers();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error deleting user. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
        Admin - Manage Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRoleChange(user._id, user.isAdmin)}
                  >
                    {user.isAdmin ? 'Demote to User' : 'Promote to Admin'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteUser(user._id)}
                    sx={{ ml: 2 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FeedbackSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Container>
  );
}

export default AdminUserManagement;
