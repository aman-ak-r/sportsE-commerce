import React, { useState } from 'react';
import './Header.css';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = ({ onNavigate, cartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => onNavigate('/')} style={{ cursor: 'pointer' }}>
          <h1>Sports Shop</h1>
        </div>
        
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

        <div className="header-actions">
          <button className="cart-button" onClick={() => onNavigate('/cart')}>
            <FaShoppingCart />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </button>
          <button className="user-button" onClick={() => onNavigate('/profile')}>
            <FaUser />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
