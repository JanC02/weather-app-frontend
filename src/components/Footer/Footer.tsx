export default function Footer() {
    return (
        <footer className='bg-transparent flex justify-center p-4 text-xs'>
            <p className='flex items-center gap-'>
                Weather and geocoding data by:
                <a
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 underline hover:text-sky-800 transition-colors duration-150"
                >
                    Open-Meteo.com
                </a>
            </p>

        </footer>
    )
}