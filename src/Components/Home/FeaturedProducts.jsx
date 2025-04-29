import React from 'react';
import './FeaturedProducts.css';
import ProductCard from '../Shared/ProductCard';

// Import product images
import cricketBat from '../../assets/cricket-bat.png';
import basketball from '../../assets/basketball.png';
import football from '../../assets/football.png';
import badmintonRacket from '../../assets/badminton-racket.png';

const FeaturedProducts = ({ onNavigate, addToCart }) => {
  const featuredProducts = [
    {
      id: 1,
      name: "Professional Cricket Bat",
      image: cricketBat,
      price: 2999,
      description: "High-quality cricket bat for professional players",
      category: 'cricket'
    },
    {
      id: 2,
      name: "Premium Basketball",
      image: basketball,
      price: 1499,
      description: "Professional grade basketball",
      category: 'basketball'
    },
    {
      id: 3,
      name: "Match Football",
      image: football,
      price: 1299,
      description: "Official match football",
      category: 'football'
    },
    {
      id: 4,
      name: "Badminton Racket",
      image: badmintonRacket,
      price: 1999,
      description: "Professional badminton racket",
      category: 'badminton'
    }
  ];

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
            onNavigate={onNavigate}
            addToCart={addToCart}
          />
        ))}
      </div>

      <button 
        className="view-all-btn"
        onClick={() => onNavigate('/products')}
      >
        View All Products
      </button>
    </section>
  );
};

export default FeaturedProducts;
