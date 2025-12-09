import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../Shared/ProductCard';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const { filteredProducts, categories, updateCategory, updateSort, updateSearch, filters } = useProducts();
  const { addToCart } = useCart();
  const { success } = useToast();

  // Handle search from URL params
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      updateSearch(searchQuery);
    }
  }, [searchParams, updateSearch]);

  const handleCategoryChange = (e) => {
    updateCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    updateSort(e.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    success(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>All Products</h1>
          <p className="products-count">{filteredProducts.length} products found</p>
        </div>

        <div className="filters">
          <select
            className="filter-select"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.sortBy}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A to Z</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
