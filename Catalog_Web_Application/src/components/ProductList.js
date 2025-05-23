// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './ProductList.css';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch products');
//         return res.json();
//       })
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="loading">Loading products...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="container">
//       <h1 className="title">Product Catalog</h1>
//       <div className="grid">
//         {products.map(product => (
//           <Link to={`/product/${product.id}`} className="card" key={product.id}>
//             <img src={product.image} alt={product.title} className="product-image" />
//             <div className="product-info">
//               <h2 className="product-title">{product.title}</h2>
//               <p className="product-category">{product.category}</p>
//               <p className="product-price">₹{product.price.toFixed(2)}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './ProductList.css';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch products');
//         return res.json();
//       })
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const filteredProducts = products.filter(product =>
//     product.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) return <div className="loading">Loading products...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <div className="container">
//       <h1 className="title">Product Catalog</h1>

//       <input
//         type="text"
//         placeholder="Search products..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="search-input"
//       />

//       <div className="grid">
//         {filteredProducts.map(product => (
//           <Link to={`/product/${product.id}`} className="card" key={product.id}>
//             <img src={product.image} alt={product.title} className="product-image" />
//             <div className="product-info">
//               <h2 className="product-title">{product.title}</h2>
//               <p className="product-category">{product.category}</p>
//               <p className="product-price">₹{product.price.toFixed(2)}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product =>
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="title">Product Catalog</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} className="card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-category">{product.category}</p>
              <p className="product-price">₹{product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
