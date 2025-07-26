import SearchBar from './SearchBar';
import { useWeather } from '../../hooks/useWeather';

export default function WeatherCard() {
    const { weatherData } = useWeather();

    return (
        <div className='flex flex-col'>
            <SearchBar />
            <div className='text-stone-900'>
                { weatherData && 
                    <>
                        <div className='flex gap-x-6 text-4xl'>
                            <span>
                                { weatherData.city }
                            </span>
                            <span>
                                { weatherData.temperature } °C
                            </span>
                            <span>
                                { weatherData.pressure } hPa
                            </span>
                        </div>
                        <p>
                            { weatherData.description }
                        </p>

                    </>
                }
            </div>
        </div>
    )
}