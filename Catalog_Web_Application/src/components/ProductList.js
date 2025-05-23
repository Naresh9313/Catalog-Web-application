import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="title">Product Catalog</h1>
      <div className="grid">
        {products.map(product => (
          <Link to={`/product/${product.id}`} className="card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-category">{product.category}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
