import React, { useState } from 'react';
import './Products.css';
import ProductCard from '../Shared/ProductCard';

// Import all product images
import cricketBat from '../../assets/cricket-bat.png';
import cricketBall from '../../assets/cricket-ball.png';
import basketball from '../../assets/basketball.png';
import football from '../../assets/football.png';
import badmintonRacket from '../../assets/badminton-racket.png';
import snookerTable from '../../assets/snooker-table.png';
import cueStick from '../../assets/cue-stick.png';
import hockeyStick from '../../assets/hockey-stick.png';
import tableTennis from '../../assets/table-tennis.png';
import chess from '../../assets/chess.png';
import carrom from '../../assets/carrom.png';
import uno from '../../assets/uno.png';
import playingCards from '../../assets/playing-cards.png';
import golfKit from '../../assets/golf-kit.png';
import golfStick from '../../assets/golf-stick.png';
import golfBall from '../../assets/golf-ball.png';

const Products = ({ onNavigate, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('price-low');

  const allProducts = [
    {
      id: 1,
      name: "Professional Cricket Bat",
      image: cricketBat,
      price: 2999,
      description: "High-quality cricket bat for professional players",
      category: 'cricket'
    },
    {
      id: 2,
      name: "Cricket Ball",
      image: cricketBall,
      price: 499,
      description: "Premium leather cricket ball",
      category: 'cricket'
    },
    {
      id: 3,
      name: "Premium Basketball",
      image: basketball,
      price: 1499,
      description: "Professional grade basketball",
      category: 'basketball'
    },
    {
      id: 4,
      name: "Match Football",
      image: football,
      price: 1299,
      description: "Official match football",
      category: 'football'
    },
    {
      id: 5,
      name: "Badminton Racket",
      image: badmintonRacket,
      price: 1999,
      description: "Professional badminton racket",
      category: 'badminton'
    },
    {
      id: 6,
      name: "Snooker Table",
      image: snookerTable,
      price: 49999,
      description: "Professional snooker table",
      category: 'snooker'
    },
    {
      id: 7,
      name: "Snooker Cue Stick",
      image: cueStick,
      price: 2499,
      description: "Premium snooker cue stick",
      category: 'snooker'
    },
    {
      id: 8,
      name: "Hockey Stick",
      image: hockeyStick,
      price: 1799,
      description: "Professional hockey stick",
      category: 'hockey'
    },
    {
      id: 9,
      name: "Table Tennis Set",
      image: tableTennis,
      price: 1299,
      description: "Complete table tennis set",
      category: 'table-tennis'
    },
    {
      id: 10,
      name: "Chess Set",
      image: chess,
      price: 999,
      description: "Premium chess set",
      category: 'board-games'
    },
    {
      id: 11,
      name: "Carrom Board",
      image: carrom,
      price: 1499,
      description: "Professional carrom board",
      category: 'board-games'
    },
    {
      id: 12,
      name: "UNO Cards",
      image: uno,
      price: 299,
      description: "Classic UNO card game",
      category: 'board-games'
    },
    {
      id: 13,
      name: "Playing Cards",
      image: playingCards,
      price: 199,
      description: "Premium playing cards",
      category: 'board-games'
    },
    {
      id: 14,
      name: "Golf Kit",
      image: golfKit,
      price: 29999,
      description: "Complete golf kit",
      category: 'golf'
    },
    {
      id: 15,
      name: "Golf Stick",
      image: golfStick,
      price: 4999,
      description: "Professional golf stick",
      category: 'golf'
    },
    {
      id: 16,
      name: "Golf Balls Set",
      image: golfBall,
      price: 999,
      description: "Premium golf balls set",
      category: 'golf'
    }
  ];

  const filteredProducts = allProducts
    .filter(product => 
      selectedCategory ? product.category === selectedCategory : true
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <div className="filters">
          <select 
            className="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="cricket">Cricket</option>
            <option value="basketball">Basketball</option>
            <option value="football">Football</option>
            <option value="badminton">Badminton</option>
            <option value="snooker">Snooker</option>
            <option value="hockey">Hockey</option>
            <option value="table-tennis">Table Tennis</option>
            <option value="board-games">Board Games</option>
            <option value="golf">Golf</option>
          </select>
          <select 
            className="sort-filter"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onNavigate={onNavigate}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products; 