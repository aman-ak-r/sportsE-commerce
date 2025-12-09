import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useLocalStorage('sportsShop_wishlist', []);

    // Add item to wishlist
    const addToWishlist = (product) => {
        setWishlist(prevWishlist => {
            const exists = prevWishlist.find(item => item.id === product.id);
            if (exists) {
                return prevWishlist; // Don't add duplicates
            }
            return [...prevWishlist, product];
        });
    };

    // Remove item from wishlist
    const removeFromWishlist = (productId) => {
        setWishlist(prevWishlist =>
            prevWishlist.filter(item => item.id !== productId)
        );
    };

    // Toggle item in wishlist
    const toggleWishlist = (product) => {
        const exists = wishlist.find(item => item.id === product.id);
        if (exists) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    // Clear entire wishlist
    const clearWishlist = () => {
        setWishlist([]);
    };

    // Check if item is in wishlist
    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount: wishlist.length
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
