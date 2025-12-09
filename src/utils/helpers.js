/**
 * Utility helper functions for the Sports E-Commerce app
 */

/**
 * Format price in Indian Rupees
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatCurrency = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} finalPrice - Final price after discount
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, finalPrice) => {
  return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with strength and message
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { valid: false, strength: 'weak', message: 'Password must be at least 8 characters' };
  }

  const strengthScore = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;

  if (strengthScore < 2) {
    return { valid: false, strength: 'weak', message: 'Password is too weak' };
  } else if (strengthScore < 3) {
    return { valid: true, strength: 'medium', message: 'Password is medium strength' };
  } else {
    return { valid: true, strength: 'strong', message: 'Password is strong' };
  }
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Filter products by search query
 * @param {Array} products - Array of products
 * @param {string} query - Search query
 * @returns {Array} Filtered products
 */
export const filterProductsBySearch = (products, query) => {
  if (!query || query.trim() === '') return products;

  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Filter products by category
 * @param {Array} products - Array of products
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered products
 */
export const filterProductsByCategory = (products, category) => {
  if (!category || category === 'all') return products;
  return products.filter(product => product.category === category);
};

/**
 * Filter products by price range
 * @param {Array} products - Array of products
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} Filtered products
 */
export const filterProductsByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(product => 
    product.finalPrice >= minPrice && product.finalPrice <= maxPrice
  );
};

/**
 * Filter products by brand
 * @param {Array} products - Array of products
 * @param {Array} brands - Array of brand names
 * @returns {Array} Filtered products
 */
export const filterProductsByBrands = (products, brands) => {
  if (!brands || brands.length === 0) return products;
  return products.filter(product => brands.includes(product.brand));
};

/**
 * Filter products by rating
 * @param {Array} products - Array of products
 * @param {number} minRating - Minimum rating
 * @returns {Array} Filtered products
 */
export const filterProductsByRating = (products, minRating) => {
  return products.filter(product => product.rating >= minRating);
};

/**
 * Sort products
 * @param {Array} products - Array of products
 * @param {string} sortBy - Sort criteria (price-low, price-high, rating, name, popular)
 * @returns {Array} Sorted products
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.finalPrice - b.finalPrice);
    case 'price-high':
      return sorted.sort((a, b) => b.finalPrice - a.finalPrice);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'popular':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
};

/**
 * Apply all filters and sorting
 * @param {Array} products - Array of products
 * @param {Object} filters - Filter options
 * @returns {Array} Filtered and sorted products
 */
export const applyFiltersAndSort = (products, filters) => {
  let filtered = [...products];

  // Apply search
  if (filters.search) {
    filtered = filterProductsBySearch(filtered, filters.search);
  }

  // Apply category filter
  if (filters.category) {
    filtered = filterProductsByCategory(filtered, filters.category);
  }

  // Apply price range filter
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    filtered = filterProductsByPriceRange(filtered, filters.minPrice, filters.maxPrice);
  }

  // Apply brand filter
  if (filters.brands && filters.brands.length > 0) {
    filtered = filterProductsByBrands(filtered, filters.brands);
  }

  // Apply rating filter
  if (filters.minRating) {
    filtered = filterProductsByRating(filtered, filters.minRating);
  }

  // Apply sorting
  if (filters.sortBy) {
    filtered = sortProducts(filtered, filters.sortBy);
  }

  return filtered;
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get related products
 * @param {Array} products - All products
 * @param {Object} currentProduct - Current product
 * @param {number} limit - Number of related products to return
 * @returns {Array} Related products
 */
export const getRelatedProducts = (products, currentProduct, limit = 4) => {
  return products
    .filter(product => 
      product.id !== currentProduct.id && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
};

/**
 * Calculate cart total
 * @param {Array} cartItems - Cart items
 * @returns {Object} Cart totals
 */
export const calculateCartTotal = (cartItems) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 1000 ? 0 : 50; // Free shipping over ₹1000
  const total = subtotal + tax + shipping;

  return {
    subtotal,
    tax,
    shipping,
    total,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
  };
};

/**
 * Format date
 * @param {Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
