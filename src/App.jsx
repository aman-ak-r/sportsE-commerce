import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Providers
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Components
import Header from './Components/Layout/Header';
import ToastContainer from './Components/Shared/ToastContainer';
import HeroSection from './Components/Home/HeroSection';
import FeaturedProducts from './Components/Home/FeaturedProducts';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';

function AppContent() {
  return (
    <div className="app">
      <Header />
      <ToastContainer />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturedProducts />
              </>
            }
          />
          <Route
            path="/products"
            element={<Products />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/wishlist"
            element={<div style={{ padding: '4rem 2rem', textAlign: 'center' }}><h2>Wishlist Page - Coming Soon!</h2></div>}
          />
          <Route
            path="/login"
            element={<div style={{ padding: '4rem 2rem', textAlign: 'center' }}><h2>Login Page - Coming Soon!</h2></div>}
          />
          <Route
            path="/contact"
            element={<div style={{ padding: '4rem 2rem', textAlign: 'center' }}><h2>Contact Page - Coming Soon!</h2></div>}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <WishlistProvider>
                <ToastProvider>
                  <AppContent />
                </ToastProvider>
              </WishlistProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

