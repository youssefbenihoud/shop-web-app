const Product = require('../models/Product');

class ProductService {
  async getAllProducts() {
    return await Product.find();
  }

  async addProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async updateProduct(productId, updatedData) {
    return await Product.findByIdAndUpdate(productId, updatedData, { new: true });
  }

  async deleteProduct(productId) {
    return await Product.findByIdAndDelete(productId);
  }
  
}

module.exports = ProductService;
