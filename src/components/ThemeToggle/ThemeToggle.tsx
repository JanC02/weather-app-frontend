import { useTheme } from '../../contexts/ThemeContext.tsx';
import SunIcon from '../../assets/icons/wi--day-sunny.svg?react';
import MoonIcon from '../../assets/icons/wi--night-clear.svg?react';
import SystemIcon from '../../assets/icons/system-icon.svg?react';

export default function ThemeToggle() {
    const { theme, setCurrentTheme } = useTheme();

    const themes = [
        { name: 'light', icon: <SunIcon /> },
        { name: 'dark', icon: <MoonIcon /> },
        { name: 'system', icon: <SystemIcon /> },
    ];

    return (
        <div className="flex items-center gap-2 rounded-full bg-gray-200 dark:bg-slate-700 p-1">
            {themes.map((t) => (
                <button
                    key={t.name}
                    onClick={() => setCurrentTheme(t.name as typeof theme)}
                    className={`p-1.5 rounded-full transition-colors duration-200 ${theme === t.name ? 'bg-white dark:bg-slate-500 text-blue-500 dark:text-sky-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}>
                    {t.icon}
                    <span className="sr-only">{t.name}</span>
                </button>
            ))}
        </div>
    );
}