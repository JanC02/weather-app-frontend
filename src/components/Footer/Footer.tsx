export default function Footer() {
    return (
        <footer className='bg-transparent flex justify-center p-4 text-xs'>
            <p className='flex items-center justify-center flex-wrap text-center'>
                <span>
                    Weather and geocoding data by:
                    <a
                        href="https://open-meteo.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 underline hover:text-sky-800 transition-colors duration-150"
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
                        className="ml-1 underline hover:text-sky-800 transition-colors duration-150"
                    >
                        ApexCharts.js
                    </a>
                </span>
            </p>
        </footer>
    )
}