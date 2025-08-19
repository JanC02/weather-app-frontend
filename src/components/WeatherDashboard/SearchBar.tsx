import { useState, useEffect } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useDebounce } from '../../hooks/useDebounce';
import type { FormEvent } from 'react';
import { WeatherService } from '../../services/WeatherService';
import { type AutocompleteResultType } from '../../types';


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
        await fetchWeather(latitude, longitude, city);
        setInputText('');
        setAutocompleteSuggestions([]);
    };

    const getSuggestionText = (suggestion: AutocompleteResultType) => {
        let resultText = suggestion.name;

        // lower case is only for PL
        if (suggestion.admin1) {
            let text = suggestion.admin1;
            if (suggestion.country_code === "PL") {
                text = text.toLowerCase();
            }
            resultText += `, ${text}`;
        }

        if (suggestion.admin2) {
            resultText += `, ${suggestion.admin2}`;
        }

        if (suggestion.country) {
            resultText += `, ${suggestion.country}`;
        }

        return resultText;
    };

    return (
        <div className='relative w-full bg-white p-4 pl-0 rounded-lg shadow-sm flex'>
            <input 
                id='search-city' 
                type='search' 
                className='h-12 flex-1 px-4 ml-4 text-lg text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                onInput={handleInput}
                value={inputText}
                placeholder='Wyszukaj miasto'
            />
            {
                autocompleteSuggestions.length > 0 && 
                <ul className='absolute top-full mt-2 w-full max-h-150 overflow-y-auto bg-white rounded-md shadow-lg z-10 overflow-hidden ring-1 ring-gray-200'>
                    {
                        autocompleteSuggestions.map(suggestion => {
                            return <li 
                                    key={suggestion.id}
                                    onClick={() => handleSearch(suggestion.latitude, suggestion.longitude, suggestion.name)}
                                    className={`
                                        min-h-12 px-4 flex items-center 
                                        text-md text-gray-700 hover:bg-blue-500 hover:text-white 
                                        transition-colors duration-150 cursor-pointer
                                    `}
                                >{getSuggestionText(suggestion)}</li>
                        })
                    }
                </ul>
            }
        </div>
    )
}