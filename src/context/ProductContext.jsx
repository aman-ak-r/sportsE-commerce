import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/productsData.json';
import { applyFiltersAndSort } from '../utils/helpers';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        minPrice: 0,
        maxPrice: 10000,
        brands: [],
        minRating: 0,
        sortBy: ''
    });

    // Load products on mount
    useEffect(() => {
        setAllProducts(productsData.products);
        setCategories(productsData.categories);
        setBrands(productsData.brands);
        setFilteredProducts(productsData.products);
    }, []);

    // Apply filters whenever they change
    useEffect(() => {
        const filtered = applyFiltersAndSort(allProducts, filters);
        setFilteredProducts(filtered);
    }, [filters, allProducts]);

    // Update search filter
    const updateSearch = (search) => {
        setFilters(prev => ({ ...prev, search }));
    };

    // Update category filter
    const updateCategory = (category) => {
        setFilters(prev => ({ ...prev, category }));
    };

    // Update price range filter
    const updatePriceRange = (minPrice, maxPrice) => {
        setFilters(prev => ({ ...prev, minPrice, maxPrice }));
    };

    // Update brand filter
    const updateBrands = (brands) => {
        setFilters(prev => ({ ...prev, brands }));
    };

    // Update rating filter
    const updateRating = (minRating) => {
        setFilters(prev => ({ ...prev, minRating }));
    };

    // Update sort
    const updateSort = (sortBy) => {
        setFilters(prev => ({ ...prev, sortBy }));
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            search: '',
            category: 'all',
            minPrice: 0,
            maxPrice: 10000,
            brands: [],
            minRating: 0,
            sortBy: ''
        });
    };

    // Get product by ID
    const getProductById = (id) => {
        return allProducts.find(product => product.id === id);
    };

    // Get products by category
    const getProductsByCategory = (category, limit) => {
        const products = allProducts.filter(product => product.category === category);
        return limit ? products.slice(0, limit) : products;
    };

    // Get featured products (highest rated)
    const getFeaturedProducts = (limit = 8) => {
        return [...allProducts]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    };

    const value = {
        allProducts,
        filteredProducts,
        categories,
        brands,
        filters,
        updateSearch,
        updateCategory,
        updatePriceRange,
        updateBrands,
        updateRating,
        updateSort,
        clearFilters,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
