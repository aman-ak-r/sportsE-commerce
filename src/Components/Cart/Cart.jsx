import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatCurrency } from '../../utils/helpers';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, tax, shipping, total } = useCart();
  const { success, info } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment processing
    setTimeout(() => {
      success('Order placed successfully!');
      clearCart();
      navigate('/');
    }, 2000);
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    info(`${productName} removed from cart`);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-content">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-container">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">{formatCurrency(item.finalPrice || item.price)}</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={isCheckingOut}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={isCheckingOut}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="item-total">{formatCurrency((item.finalPrice || item.price) * item.quantity)}</p>
                <button
                  className="remove-item"
                  onClick={() => handleRemoveItem(item.id, item.name)}
                  disabled={isCheckingOut}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18% GST):</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button
              className="checkout-button btn btn-primary"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <button
              className="continue-shopping btn btn-outline"
              onClick={() => navigate('/products')}
              disabled={isCheckingOut}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

