import React from 'react';
import './ProductCard.css';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, onNavigate, addToCart }) => {
  const { name, image, price, description, category, id } = product;

  const handleProductClick = () => {
    onNavigate(`/products/${category}/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    console.log('Add to cart clicked for product:', product);
    if (typeof addToCart === 'function') {
      addToCart(product);
    } else {
      console.error('addToCart is not a function:', addToCart);
    }
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image">
        <img src={image} alt={name} />
        <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
          <FaHeart />
        </button>
      </div>
      
      <div className="product-info">
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <div className="price">₹{price}</div>
        
        <button className="add-to-cart" onClick={handleAddToCart}>
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
