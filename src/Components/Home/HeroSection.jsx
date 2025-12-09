import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import basketball from '../../assets/basketball.png';
import football from '../../assets/football.png';
import cricketBat from '../../assets/cricket-bat.png';
import badmintonRacket from '../../assets/badminton-racket.png';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: basketball,
      title: "Basketball Equipment",
      description: "Professional grade basketball gear",
      category: 'basketball'
    },
    {
      image: football,
      title: "Football Gear",
      description: "High-quality football equipment",
      category: 'football'
    },
    {
      image: cricketBat,
      title: "Cricket Equipment",
      description: "Premium cricket gear for professionals",
      category: 'cricket'
    },
    {
      image: badmintonRacket,
      title: "Badminton Gear",
      description: "Top-notch badminton equipment",
      category: 'badminton'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <button
                className="shop-now-btn btn btn-primary"
                onClick={() => navigate('/products')}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

