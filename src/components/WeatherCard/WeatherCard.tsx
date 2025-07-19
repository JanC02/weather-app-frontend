import type { FormEvent } from 'react';
import SearchBar from './SearchBar';

export default function WeatherCard() {
    return (
        <div className='flex flex-col items-centew'>
            <SearchBar />
            <div className='flex gap-x-6 text-4xl text-stone-900'>
                <p>
                    Tarnów
                </p>
                <span>
                    22°C
                </span>
            </div>
        </div>
    )
}