import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateQuantity, onNavigate }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment processing
    setTimeout(() => {
      alert('Order placed successfully!');
      onNavigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button 
          className="continue-shopping"
          onClick={() => onNavigate('/products')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>
              </div>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={isCheckingOut}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={isCheckingOut}
                >
                  +
                </button>
              </div>
              <p className="item-total">₹{item.price * item.quantity}</p>
              <button 
                className="remove-item"
                onClick={() => removeFromCart(item.id)}
                disabled={isCheckingOut}
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
            <span>₹{total}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
          <button 
            className="checkout-button"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          <button 
            className="continue-shopping"
            onClick={() => onNavigate('/products')}
            disabled={isCheckingOut}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
