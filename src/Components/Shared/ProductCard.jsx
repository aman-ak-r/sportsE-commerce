import React from 'react';
import './ProductCard.css';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, onNavigate, addToCart }) => {
  console.log('ProductCard - Props received:', {
    productId: product?.id,
    hasOnNavigate: typeof onNavigate === 'function',
    hasAddToCart: typeof addToCart === 'function'
  });

  const { name, image, price, description, category, id } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Add to cart clicked for product:', id);
    
    if (typeof addToCart === 'function') {
      console.log('Calling addToCart function');
      addToCart(product);
    } else {
      console.error('addToCart is not a function');
    }
  };

  const handleProductClick = (e) => {
    // Only navigate if the click wasn't on a button
    if (!e.target.closest('button')) {
      console.log('Navigating to product:', id);
      onNavigate(`/products/${category}/${id}`);
    }
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image">
        <img src={image} alt={name} />
        <button 
          className="wishlist-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <FaHeart />
        </button>
      </div>
      
      <div className="product-info">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <div className="price">₹{price}</div>
        
        <button 
          className="add-to-cart" 
          onClick={handleAddToCart}
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
