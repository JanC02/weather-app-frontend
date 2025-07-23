import { useState, useEffect } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useDebounce } from '../../hooks/useDebounce';
import type { FormEvent } from 'react';
import { WeatherService } from '../../services/WeatherService';

type Suggestion = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export default function SearchBar() {
    const [inputText, setInputText] = useState('');
    const [ autocompleteSuggestions, setAutocompleteSuggestions ] = useState<Suggestion[]>([]);
    const { fetchWeather } = useWeather();
    const debouncedValue = useDebounce(inputText, 500);

    useEffect(() => {
        const getSuggestions = async () => {
            const data = await WeatherService.getInstance().getAutocompleteSuggestions(debouncedValue);
            setAutocompleteSuggestions(data.results || []);
        }
        getSuggestions();
    }, [debouncedValue]);

    const handleInput = (event: FormEvent) => {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        setInputText(value);
    };

    const handleSearch = async (city: string) => {
        await fetchWeather(city);
        setInputText('');
        setAutocompleteSuggestions([]);
    };

    return (
        <div className='mb-5 flex flex-col gap-y-5 relative'>
            <label className='w-full'>
                <input 
                    id='search-city' 
                    type='search' 
                    className='min-w-80 w-full max-w-225 h-10 pl-1.5 flex items-center border border-stone-300 focus-visible:border-stone-300 rounded-md text-xl text-stone-900 ' 
                    onInput={handleInput}
                    value={inputText}
                    placeholder='Enter a city'
                />
            </label>
            {/* <button onClick={handleSearch} className='cursor-pointer w-fit p-1 border border-stone-300 rounded-lg'>
                Search
            </button> */}
            <ul className='absolute top-full w-full'>
                {
                    autocompleteSuggestions.map(suggestion => {
                        return <li 
                                key={suggestion.id}
                                onClick={() => handleSearch(suggestion.name)}
                                className={`
                                    h-10 pl-1.5 flex items-center 
                                    text-xl max-w-225 bg-stone-100 hover:bg-stone-200 text-stone-900 
                                    transition duration-100 cursor-pointer
                                    first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md
                                `}
                            >{suggestion.name}</li>
                    })
                }
            </ul>
        </div>
    )
}