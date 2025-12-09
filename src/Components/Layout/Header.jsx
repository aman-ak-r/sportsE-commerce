import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo" onClick={() => handleNavigation('/')}>
          <h1>Sports<span>Shop</span></h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav desktop-nav">
          <button onClick={() => handleNavigation('/')} className="nav-link">
            Home
          </button>
          <button onClick={() => handleNavigation('/products')} className="nav-link">
            Products
          </button>
          <button onClick={() => handleNavigation('/contact')} className="nav-link">
            Contact
          </button>
        </nav>

        {/* Search Bar */}
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <FaSearch />
          </button>
        </form>

        {/* Actions */}
        <div className="header-actions">
          {/* Dark Mode Toggle */}
          <button
            className="action-btn theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>

          {/* Wishlist */}
          <button
            className="action-btn wishlist-btn"
            onClick={() => handleNavigation('/wishlist')}
            aria-label="Wishlist"
          >
            <FaHeart />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </button>

          {/* Cart */}
          <button
            className="action-btn cart-btn"
            onClick={() => handleNavigation('/cart')}
            aria-label="Shopping cart"
          >
            <FaShoppingCart />
            {itemCount > 0 && <span className="badge">{itemCount}</span>}
          </button>

          {/* User */}
          <button
            className="action-btn user-btn"
            onClick={() => handleNavigation(isAuthenticated ? '/profile' : '/login')}
            aria-label="User account"
          >
            <FaUser />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="action-btn mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fade-in">
          <nav className="mobile-nav">
            <button onClick={() => handleNavigation('/')} className="mobile-nav-link">
              Home
            </button>
            <button onClick={() => handleNavigation('/products')} className="mobile-nav-link">
              Products
            </button>
            <button onClick={() => handleNavigation('/contact')} className="mobile-nav-link">
              Contact
            </button>
            {isAuthenticated && (
              <button onClick={() => handleNavigation('/profile')} className="mobile-nav-link">
                My Account
              </button>
            )}
          </nav>

          {/* Mobile Search */}
          <form className="mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;

