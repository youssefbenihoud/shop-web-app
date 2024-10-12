import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

function Navbar({ token, handleLogout, isAdmin }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Shop Application
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {isAdmin && (
          <Button color="inherit" component={Link} to="/admin/create-product">
            Create Product
          </Button>
        )}
        {isAdmin && (
          <>
            <Button color="inherit" component={Link} to="/admin/create-product">
              Create Product
            </Button>
            <Button color="inherit" component={Link} to="/admin/manage-users">
              Manage Users
            </Button>
          </>
        )}
        {!token ? (
          <>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        ) : (
          <>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCartIcon />
            </IconButton>
            <Button color="inherit" component={Link} to="/orders">
              Order History
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
