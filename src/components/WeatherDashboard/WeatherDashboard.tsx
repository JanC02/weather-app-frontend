import SearchBar from './SearchBar';
import Humidity from './Humidity';
import DailyForecast from './DailyForecast';
import { useWeather } from '../../hooks/useWeather';
import CurrentWeather from './CurrentWeather';
import Pressure from './Pressure';
import Meteorograms from './Meteorograms.tsx';
import type { WeatherState, DashboardStatus } from '../../types';
import Spinner from '../Spinner';

const renderContent = (
    weatherData: WeatherState | null, 
    status: DashboardStatus
) => {
    return (
        <div className='w-full max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>

            <div className="lg:col-span-1 flex flex-col gap-8">
                <SearchBar/>
                { (weatherData && status === 'OK') && <>
                        <CurrentWeather temperature={weatherData.current.temperature} city={weatherData.city} description={weatherData.current.description} weatherCode={weatherData.current.weatherCode} isDay={weatherData.current.isDay} />
                        <DailyForecast dailyWeather={weatherData?.daily} />
                    </>
                }
            </div>

            { status === 'LOADING' && (
                <div className='lg:col-span-2 h-full bg-white rounded-lg shadow-sm flex items-center justify-center'>
                    <Spinner />
                </div> 
            )}

            { (!weatherData && status === 'OK') && (
                <div className="h-20 flex items-center justify-center lg:col-span-2 bg-white p-6 rounded-lg shadow-sm text-center">
                    <p>Wyszukaj miasto aby zobaczyć pogodę.</p>
                </div>
            )}

            { (weatherData && status === 'OK') && (
                <div className="lg:col-span-2 flex flex-col gap-8 h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <Pressure pressure={weatherData.current.pressure}/>
                        <Humidity humidity={weatherData.current.humidity}/>
                    </div>
                    <Meteorograms hourlyWeather={weatherData.hourly} />
                </div>
            )}
        </div>
    )
};

const renderError = () => {
    return (
        <div>
            Przepraszamy, wystąpił błąd. Prosimy spróbować później.
        </div>
    )
}

export default function WeatherDashboard() {
    const { weatherData, currentStatus } = useWeather();

    switch(currentStatus) {
        case 'LOADING':
        case 'OK':
            return renderContent(weatherData, currentStatus)
        case 'ERROR':
            return renderError()
    }
}