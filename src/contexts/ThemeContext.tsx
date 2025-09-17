import { createContext, use, useEffect, useState } from 'react';
import { config } from '../config.ts';
import type { ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
    theme: Theme;
    setCurrentTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
};

export default function ThemeProvider({
    children,
    defaultTheme = config.defaultTheme,
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setCurrentTheme: (theme: Theme) => setTheme(theme)
    };

    return (
        <ThemeContext value={value}>
            {children}
        </ThemeContext>
    );
}

export const useTheme = () => {
    const context = use(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};