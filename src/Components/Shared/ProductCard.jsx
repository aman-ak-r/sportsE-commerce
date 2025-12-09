import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success } = useToast();

  const { name, image, price, finalPrice, description, category, id, rating, discount } = product;
  const inWishlist = isInWishlist(id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (inWishlist) {
      success('Removed from wishlist');
    } else {
      success('Added to wishlist!');
    }
  };

  const handleProductClick = (e) => {
    if (e.target.closest('.add-to-cart') || e.target.closest('.wishlist-btn')) {
      return;
    }
    navigate(`/products/${category}/${id}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />

        {discount > 0 && (
          <span className="discount-badge">{discount}% OFF</span>
        )}

        <button
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
        >
          <FaHeart />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>

        {rating && (
          <div className="product-rating">
            <FaStar className="star-icon" />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}

        <div className="product-price">
          {discount > 0 ? (
            <>
              <span className="final-price">{formatCurrency(finalPrice)}</span>
              <span className="original-price">{formatCurrency(price)}</span>
            </>
          ) : (
            <span className="final-price">{formatCurrency(price)}</span>
          )}
        </div>

        <button
          className="add-to-cart btn btn-primary"
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

