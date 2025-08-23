import SearchBar from './SearchBar';
import Humidity from './Humidity';
import DailyForecast from './DailyForecast';
import { useWeather } from '../../hooks/useWeather';
import CurrentWeather from './CurrentWeather';
import Pressure from './Pressure';
import Meteorogram from './Meteorogram';

export default function WeatherDashboard() {
    const { weatherData } = useWeather();

    return (
        <div className='w-full max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>

            <div className="lg:col-span-1 flex flex-col gap-8">
                <SearchBar/>
                { weatherData && <>
                        <CurrentWeather temperature={weatherData.current.temperature_2m} city={weatherData.city} description={weatherData.description} weatherCode={weatherData.current.weather_code} isDay={weatherData.current.is_day} />
                        <DailyForecast dailyWeather={weatherData?.dailyWeather} />
                    </>
                }
            </div>

            { !weatherData && <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm text-center">
                <p>Wyszukaj miasto aby zobaczyć pogodę.</p>
            </div> }

            { weatherData && <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <Pressure pressure={weatherData.current.pressure_msl}/>
                        <Humidity humidity={weatherData.current.relative_humidity_2m}/>
                    </div>
                    <Meteorogram hourlyWeather={weatherData.hourlyWeather} />
                </div>
            }
        </div>
    );
}