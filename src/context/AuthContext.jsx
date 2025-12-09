import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { validateEmail, validatePassword } from '../utils/helpers';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('sportsShop_user', null);
    const [users, setUsers] = useLocalStorage('sportsShop_users', []);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(!!user);
    }, [user]);

    // Sign up new user
    const signup = (userData) => {
        const { name, email, password } = userData;

        // Validate email
        if (!validateEmail(email)) {
            return { success: false, message: 'Invalid email address' };
        }

        // Validate password
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return { success: false, message: passwordValidation.message };
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return { success: false, message: 'User already exists with this email' };
        }

        // Create new user
        const newUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        // Save to users list
        setUsers([...users, newUser]);

        // Auto login
        const userSession = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };
        setUser(userSession);

        return { success: true, message: 'Account created successfully' };
    };

    // Login user
    const login = (email, password) => {
        // Validate email
        if (!validateEmail(email)) {
            return { success: false, message: 'Invalid email address' };
        }

        // Find user
        const foundUser = users.find(u => u.email === email);
        if (!foundUser) {
            return { success: false, message: 'No account found with this email' };
        }

        // Check password
        if (foundUser.password !== password) {
            return { success: false, message: 'Incorrect password' };
        }

        // Create session
        const userSession = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email
        };
        setUser(userSession);

        return { success: true, message: 'Login successful' };
    };

    // Logout user
    const logout = () => {
        setUser(null);
    };

    // Update user profile
    const updateProfile = (updates) => {
        if (!user) return { success: false, message: 'Not authenticated' };

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);

        // Update in users list
        setUsers(users.map(u =>
            u.id === user.id ? { ...u, ...updates } : u
        ));

        return { success: true, message: 'Profile updated successfully' };
    };

    const value = {
        user,
        isAuthenticated,
        signup,
        login,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
