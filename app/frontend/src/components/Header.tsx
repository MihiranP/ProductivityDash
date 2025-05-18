// src/components/Header.tsx
import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Apply dark mode class to root element
    useEffect(() => {
        // Check if user has a preference stored
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else if (storedTheme === 'light') {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        } else {
            // Check system preference if no stored preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                Productivity Dashboard
            </div>
            <div className={styles.controls}>
                <button
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {isDarkMode ? 'D' : 'L'}
                </button>
            </div>
        </header>
    );
};

export default Header;