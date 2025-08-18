import DashboardItem from './DashboardItem';
import { getIcon } from "../../utils/getIcon.ts";

type CurrentWeatherProps = {
    temperature: number;
    city: string;
    weatherCode: number;
    description?: string;
}

export default function CurrentWeather({ temperature, city, description, weatherCode }: CurrentWeatherProps) {
    const Icon = getIcon(weatherCode);

    return <DashboardItem>
        <h2 className="font-bold text-2xl mb-4">Obecna pogoda</h2>
        <div className="flex items-center gap-4">
            <Icon className='w-24 h-24' />
            <div>
                <p className="text-5xl font-extrabold">{Math.round(temperature)}°C</p>
                <p className="text-xl font-bold text-gray-700">{city}</p>
                <p className="text-md text-gray-500 capitalize">{description || 'Opis niedostępny.'}</p>
            </div>
        </div>
    </DashboardItem>
}