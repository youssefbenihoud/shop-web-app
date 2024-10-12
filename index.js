const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data for products
const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 }
];

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Endpoint to get all products
app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
