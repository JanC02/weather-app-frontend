import SearchBar from './SearchBar';

export default function WeatherCard() {
    return (
        <div className='mt-20 w-384 flex items-center justify-between'>
            <div className='flex gap-x-6 text-4xl text-stone-900'>
                <p>
                    Tarnów
                </p>
                <span>
                    22°C
                </span>
            </div>
            <SearchBar />
        </div>
    )
}