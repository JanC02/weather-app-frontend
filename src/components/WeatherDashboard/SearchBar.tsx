import { useState, useEffect } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useDebounce } from '../../hooks/useDebounce';
import type { FormEvent } from 'react';
import { WeatherService } from '../../services/WeatherService';
import { type AutocompleteResultType } from '../../types';
import SuggestionItem from './SuggestionItem';
import ClearButton from './ClearButton';

export default function SearchBar() {
    const [inputText, setInputText] = useState('');
    const [ autocompleteSuggestions, setAutocompleteSuggestions ] = useState<AutocompleteResultType[]>([]);
    const { fetchWeather } = useWeather();
    const debouncedValue = useDebounce(inputText, 500);

    useEffect(() => {
        const getSuggestions = async () => {
            const data = await WeatherService.getInstance().getAutocompleteSuggestions(debouncedValue);
            if (Array.isArray(data)) {
                setAutocompleteSuggestions(data);
            } else {
                setAutocompleteSuggestions(data.results);
            }
        }
        getSuggestions();
    }, [debouncedValue]);

    const handleInput = (event: FormEvent) => {
        const target = event.currentTarget as HTMLInputElement;
        const value = target.value;
        setInputText(value);
    };

    const handleSearch = async (latitude: number, longitude: number, city: string) => {
        setInputText('');
        setAutocompleteSuggestions([]);
        await fetchWeather(latitude, longitude, city);
    };

    return (
        <div className='relative w-full bg-white p-4 pl-0 rounded-lg shadow-sm flex items-center'>
            <input
                id='search-city'
                type='search'
                className='h-12 flex-1 px-4 ml-4 text-lg text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none'
                onInput={handleInput}
                value={inputText}
                placeholder='Wyszukaj miasto'
            />
            {inputText && (
                <ClearButton
                    onClick={() => {
                        setInputText('');
                        setAutocompleteSuggestions([]);
                    }}
                />
            )}
            {
                autocompleteSuggestions.length > 0 &&
                <ul className='absolute top-full mt-2 w-full max-h-150 overflow-y-auto bg-white rounded-md shadow-lg z-10 overflow-hidden ring-1 ring-gray-200'>
                    {
                        autocompleteSuggestions.map(suggestion => {
                            return <SuggestionItem key={suggestion.id} suggestion={suggestion} handleSearch={handleSearch} />;
                        })
                    }
                </ul>
            }
        </div>
    )
}