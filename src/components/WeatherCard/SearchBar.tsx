import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useWeather } from '../../hooks/useWeather';

export default function SearchBar() {
    // const [inputText, setInputText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const { fetchWeather } = useWeather();

    // // TODO: zrobic hooka do debouncingu. useDebounce.
    // let timeout = useRef<number | null>(null);
    // const onInput = (event: FormEvent) => {
    //     if (timeout.current) {
    //         clearTimeout(timeout.current);
    //     }
    //     timeout.current = setTimeout(() => {
    //         const input = event.target as HTMLInputElement;
    //         const value = input.value;

    //         if (value.length > 0) {
    //             console.log(value);
    //             setInputText(value);
    //         }
    //     }, 1000);
    // };

    // useEffect(() => {
    //     return () => {
    //         if (timeout.current) {
    //             clearTimeout(timeout.current);
    //         }
    //     }
    // }, []);

    const handleSearch = async () => {
        if (inputRef.current && inputRef.current.value.length > 0) {
            await fetchWeather(inputRef.current.value);
        }
    };

    return (
        <div className='mb-5 flex flex-col gap-y-5'>
            <label className='w-full'>
                <input 
                    ref={inputRef} 
                    id='search-city' 
                    type='search' 
                    className='min-w-80 w-full max-w-225 h-8 border border-stone-300 rounded-lg' 
                    // onInput={onInput}
                />
            </label>
            <button onClick={handleSearch} className='cursor-pointer w-fit p-1 border border-stone-300 rounded-lg'>
                Search
            </button>
        </div>
    )
}