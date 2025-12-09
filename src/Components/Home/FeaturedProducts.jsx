import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../Shared/ProductCard';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { getFeaturedProducts } = useProducts();
  const { addToCart } = useCart();
  const { success } = useToast();

  const featuredProducts = getFeaturedProducts(8);

  const handleAddToCart = (product) => {
    addToCart(product);
    success(`${product.name} added to cart!`);
  };

  return (
    <section className="featured-products">
      <div className="section-header">
        <h2>Featured Products</h2>
        <p>Check out our top picks for you</p>
      </div>

      <div className="products-grid">
        {featuredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <button
        className="view-all-btn btn btn-primary"
        onClick={() => navigate('/products')}
      >
        View All Products
      </button>
    </section>
  );
};

export default FeaturedProducts;

