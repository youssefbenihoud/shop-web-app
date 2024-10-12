import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h2>Products</h2>
      <div>
        {products.map(product => (
          <div key={product._id}>
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
