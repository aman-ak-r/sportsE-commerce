import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage('sportsShop_theme', 'light');

    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);

        // Update body class
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const setLightTheme = () => {
        setTheme('light');
    };

    const setDarkTheme = () => {
        setTheme('dark');
    };

    const value = {
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setLightTheme,
        setDarkTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
