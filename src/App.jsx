import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Layout/Header';
import HeroSection from './Components/Home/HeroSection';
import FeaturedProducts from './Components/Home/FeaturedProducts';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';

function AppContent() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      console.log('Loading initial cart from localStorage:', savedCart);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      console.log('Parsed cart:', parsedCart);
      return parsedCart;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
  
  useEffect(() => {
    console.log('Cart state changed, saving to localStorage:', cart);
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Successfully saved cart to localStorage');
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    console.log('Product details:', {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      category: product?.category
    });
    
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    setCart(prevCart => {
      console.log('Previous cart state:', prevCart);
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        console.log('Found existing item:', existingItem);
        const newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
        console.log('Updated cart (existing item):', newCart);
        return newCart;
      }
      
      console.log('Adding new item to cart');
      const newCart = [...prevCart, { ...product, quantity: 1 }];
      console.log('Updated cart (new item):', newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      console.log('Removed item from cart:', newCart);
      return newCart;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      console.log('Updated quantity in cart:', newCart);
      return newCart;
    });
  };

  return (
    <div className="app">
      <Header 
        onNavigate={handleNavigation} 
        cartItemCount={cart.reduce((sum, item) => sum + (item.quantity || 0), 0)} 
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
