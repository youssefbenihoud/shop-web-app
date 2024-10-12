const ProductService = require('../services/ProductService');
const productService = new ProductService();

// Controller function to create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Call ProductService to add the product
    const newProduct = await productService.addProduct({ name, price, description });
    
    res.status(201).json(newProduct); // Send the new product as a response
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = await productService.addProduct({ name, price });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the product.' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProduct = await productService.updateProduct(id, updatedData);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the product.' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
};

module.exports = {
  createProduct,
  getAllProducts
};