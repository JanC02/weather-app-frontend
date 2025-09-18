import { useState, useEffect } from 'react';
import { useWeather } from '../../hooks/useWeather.ts';
import { useDebounce } from '../../hooks/useDebounce.ts';
import type { FormEvent } from 'react';
import type { AutocompleteResultType } from '../../types.ts';
import SuggestionItem from './SuggestionItem.tsx';
import ClearButton from './ClearButton.tsx';

export default function SearchBar() {
    const [inputText, setInputText] = useState('');
    const [ autocompleteSuggestions, setAutocompleteSuggestions ] = useState<AutocompleteResultType[]>([]);
    const { fetchWeather, fetchAutocompleteData } = useWeather();
    const debouncedValue = useDebounce(inputText, 500);

    useEffect(() => {
        const getSuggestions = async () => {
            const data = await fetchAutocompleteData(debouncedValue);
            if (Array.isArray(data)) {
                setAutocompleteSuggestions(data);
            } else if(data.results){
                setAutocompleteSuggestions(data.results);
            } else {
                setAutocompleteSuggestions([]);
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
        <div className='relative w-full bg-white dark:bg-slate-800/50 p-4 pl-0 rounded-lg shadow-sm flex items-center'>
            <input
                id='search-city'
                type='search'
                className='h-12 flex-1 px-4 ml-4 text-lg text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none dark:bg-slate-700 dark:border-slate-600 dark:text-gray-200 dark:focus:ring-sky-500'
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
                <ul className='absolute top-full mt-2 w-full max-h-90 md:max-h-150 overflow-y-auto bg-white rounded-md shadow-lg z-10 overflow-hidden ring-1 ring-gray-200 dark:bg-slate-700 dark:ring-slate-600'>
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