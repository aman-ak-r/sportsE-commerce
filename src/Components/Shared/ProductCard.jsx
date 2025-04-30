import React from 'react';
import './ProductCard.css';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, onNavigate, addToCart }) => {
  console.log('ProductCard - Props received:', {
    productId: product?.id,
    productName: product?.name,
    hasOnNavigate: typeof onNavigate === 'function',
    hasAddToCart: typeof addToCart === 'function'
  });

  const { name, image, price, description, category, id } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Add to cart clicked for product:', {
      id,
      name,
      price,
      category
    });
    
    if (typeof addToCart === 'function') {
      console.log('Calling addToCart function with product:', {
        id,
        name,
        price,
        category
      });
      addToCart({
        id,
        name,
        image,
        price,
        description,
        category
      });
    } else {
      console.error('addToCart is not a function');
    }
  };

  const handleProductClick = (e) => {
    if (e.target.closest('.add-to-cart') || e.target.closest('.wishlist-btn')) {
      return;
    }
    console.log('Navigating to product:', id);
    onNavigate(`/products/${category}/${id}`);
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
