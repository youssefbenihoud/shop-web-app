import React, { useEffect, useState } from 'react';
import { getAllProducts, addToCart } from '../services/api';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from '@mui/material';

function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!token) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      await addToCart(token, productId, 1);
      alert('Product added to cart successfully!');
    } catch (error) {
      alert('Error adding product to cart. Please try again.');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          height: '400px',
          backgroundImage: 'url("https://example.com/hero-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px #000' }}>
          Welcome to Our Shop
        </Typography>
      </Box>

      {/* Products Section */}
      <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
        Featured Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product._id)}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductList;
