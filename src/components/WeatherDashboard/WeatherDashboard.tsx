import SearchBar from './SearchBar';
import Humidity from './Humidity';
import DailyForecast from './DailyForecast';
import DashboardItem from './DashboardItem';
import { useWeather } from '../../hooks/useWeather';

// icon
const WeatherIcon = () => (
    <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-lg">
        <span className="text-5xl">☀️</span>
    </div>
);

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
                   <DashboardItem>
                       <h2 className="font-bold text-2xl mb-4">Obecna pogoda</h2>
                       <div className="flex items-center gap-4">
                           <WeatherIcon/>
                           <div>
                               <p className="text-5xl font-extrabold">{Math.round(weatherData.current.temperature_2m)}°C</p>
                               <p className="text-xl font-bold text-gray-700">{weatherData.city}</p>
                               <p className="text-md text-gray-500 capitalize">{weatherData.description || 'Clear Sky'}</p>
                           </div>
                       </div>
                   </DashboardItem>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                        <p className="text-gray-500">Wyszukaj miasto aby zobaczyć pogodę.</p>
                    </div>
                )}
                <DailyForecast />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-8">
                {weatherData && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg mb-2">Ciśnienie</h3>
                            <p className="text-4xl font-bold">{weatherData.current.pressure_msl} <span
                                className="text-2xl text-gray-500">hPa</span></p>
                        </div>
                        <Humidity humidity={weatherData.current.relative_humidity_2m}/>
                    </div>
                )}
                <ChartPlaceholder/>
            </div>
        </div>
    );
}