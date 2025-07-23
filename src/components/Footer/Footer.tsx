export default function Footer() {
    return (
        <footer className='h-16 bg-green-400 flex justify-center gap-4'>
            <h2 className='h-full text-slate-50 font-semibold flex items-center justify-center gap-4'>Autor: Jan Chrobak</h2>
            <p className='flex items-center gap-1 text-slate-50'>
                Weather data by:
                <a
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-sky-800"
                >
                    Open-Meteo.com
                </a>
            </p>

        </footer>
    )
}