import SearchBar from './SearchBar';
import Humidity from './Humidity';
import DailyForecast from './DailyForecast';
import { useWeather } from '../../hooks/useWeather';
import CurrentWeather from './CurrentWeather';
import Pressure from './Pressure';

// chart placeholder
const ChartPlaceholder = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm h-full flex flex-col">
        <h3 className="font-bold text-lg mb-2">Trend temperaturowy</h3>
        <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-lg">
            <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 100 50">
                <path d="M 0 40 C 10 10, 30 10, 40 25 S 60 40, 70 30 S 90 10, 100 20" strokeWidth="2" />
            </svg>
        </div>
    </div>
);

export default function WeatherDashboard() {
    const { weatherData } = useWeather();

    return (
        <div className='w-full max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>

            <div className="lg:col-span-1 flex flex-col gap-8">
                <SearchBar/>
                {weatherData ? (
                    <>
                        <CurrentWeather temperature={weatherData.current.temperature_2m} city={weatherData.city} description={weatherData.description} />
                        <DailyForecast dailyWeather={weatherData?.dailyWeather} />
                    </>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                        <p className="text-gray-500">Wyszukaj miasto aby zobaczyć pogodę.</p>
                    </div>
                )}
            </div>

            <div className="lg:col-span-2 flex flex-col gap-8">
                {weatherData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <Pressure pressure={weatherData.current.pressure_msl}/>
                        <Humidity humidity={weatherData.current.relative_humidity_2m}/>
                    </div>
                )}
                <ChartPlaceholder/>
            </div>
        </div>
    );
}