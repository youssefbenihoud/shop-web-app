const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample data for products
let products = [
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

// Endpoint to add a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Automatically assign an ID
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
