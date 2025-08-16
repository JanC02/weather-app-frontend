import DashboardItem from './DashboardItem';

type CurrentWeatherProps = {
    temperature: number;
    city: string;
    description?: string;
}

// icon
const WeatherIcon = () => (
    <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-lg">
        <span className="text-5xl">☀️</span>
    </div>
);

export default function CurrentWeather({ temperature, city, description }: CurrentWeatherProps) {
    return <DashboardItem>
        <h2 className="font-bold text-2xl mb-4">Obecna pogoda</h2>
        <div className="flex items-center gap-4">
            <WeatherIcon/>
            <div>
                <p className="text-5xl font-extrabold">{Math.round(temperature)}°C</p>
                <p className="text-xl font-bold text-gray-700">{city}</p>
                <p className="text-md text-gray-500 capitalize">{description || 'Opis niedostępny.'}</p>
            </div>
        </div>
    </DashboardItem>
}