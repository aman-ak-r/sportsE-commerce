import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { calculateCartTotal } from '../utils/helpers';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useLocalStorage('sportsShop_cart', []);

    // Add item to cart
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                // Update quantity if item already exists
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Add new item with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Update item quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Increase quantity
    const increaseQuantity = (productId) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (productId) => {
        setCart(prevCart =>
            prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity - 1;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
    };

    // Check if item is in cart
    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    // Get item quantity
    const getItemQuantity = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    // Calculate totals
    const cartTotals = calculateCartTotal(cart);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
        cartCount: cart.length,
        itemCount: cartTotals.itemCount,
        subtotal: cartTotals.subtotal,
        tax: cartTotals.tax,
        shipping: cartTotals.shipping,
        total: cartTotals.total
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
