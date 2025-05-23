import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product details');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Products</button>
      <div className="detail-card">
        <img src={product.image} alt={product.title} className="detail-image" />
        <div className="detail-info">
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-category">Category: {product.category}</p>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
