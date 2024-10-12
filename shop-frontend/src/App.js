import React, { useState, useEffect } from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Cart from './components/Cart';
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Shop</h1>
          <nav>
            <Link to="/">Home</Link>
            {!token ? (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
