import { useRef } from 'react';
import { WeatherService } from '../../services/WeatherService';

export default function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = async () => {
        if (inputRef.current && inputRef.current.value.length > 0) {
            const weatherSerive = WeatherService.getInstance();

            const data = await weatherSerive.getWeather(inputRef.current.value);

            console.log(data);
        }
    };

    return (
        <div className='flex items-baseline gap-3'>
            <label htmlFor='search-city'>
                <input ref={inputRef} id='search-city' type='search' className='w-70 h-8 border border-stone-300' />
            </label>
            <button onClick={handleSearch} className='cursor-pointer'>
                Search
            </button>
        </div>
    )
}