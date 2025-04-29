import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Components/Layout/Header';
import HeroSection from './Components/Home/HeroSection';
import FeaturedProducts from './Components/Home/FeaturedProducts';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Function to add item to cart
  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        const newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('Updated cart (existing item):', newCart);
        return newCart;
      }
      const newCart = [...prevCart, { ...product, quantity: 1 }];
      console.log('Updated cart (new item):', newCart);
      return newCart;
    });
    // Show success message
    alert(`${product.name} added to cart!`);
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Function to update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <div className="app">
      <Header 
        onNavigate={handleNavigation} 
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
      />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <HeroSection onNavigate={handleNavigation} />
                <FeaturedProducts onNavigate={handleNavigation} addToCart={addToCart} />
              </>
            } 
          />
          <Route 
            path="/products" 
            element={<Products onNavigate={handleNavigation} addToCart={addToCart} />} 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                onNavigate={handleNavigation}
              />
            } 
          />
          <Route 
            path="/search" 
            element={<Products onNavigate={handleNavigation} addToCart={addToCart} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
