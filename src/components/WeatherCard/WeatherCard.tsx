import SearchBar from './SearchBar';
import { useWeather } from '../../hooks/useWeather';

export default function WeatherCard() {
    const { weatherData } = useWeather();

    return (
        <div className='flex flex-col items-centew'>
            <SearchBar />
            <div className='flex gap-x-6 text-4xl text-stone-900'>
                { weatherData && 
                    <>
                        <p>
                            { weatherData.city }
                        </p>
                        <span>
                            { weatherData.temperature } °C
                        </span> 
                    </>
                }
            </div>
        </div>
    )
}