import ThemeToggle from '../ThemeToggle/ThemeToggle.tsx';

export default function Footer() {
    return (
        <footer className='bg-transparent flex flex-col sm:flex-row items-center justify-center gap-4 p-4 text-xs text-gray-600 dark:text-gray-400'>
            <div className='flex items-center justify-center flex-wrap text-center'>
                <span>
                    Weather and geocoding data by:
                    <a
                        href="https://open-meteo.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 underline hover:text-sky-800 dark:hover:text-sky-400 transition-colors duration-150"
                    >
                        Open-Meteo.com
                    </a>
                </span>
                <span className="mx-2">|</span>
                <span>
                    Charts by:
                    <a
                        href="https://apexcharts.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 underline hover:text-sky-800 dark:hover:text-sky-400 transition-colors duration-150"
                    >
                        ApexCharts.js
                    </a>
                </span>
            </div>
            <ThemeToggle />
        </footer>
    );
}