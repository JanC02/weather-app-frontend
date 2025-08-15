import ForecastItem from './ForecastItem.tsx';
import { useWeather } from "../../hooks/useWeather.ts";

export default function DailyForecast() {
    const { weatherData } = useWeather();

    return <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-bold text-2xl mb-4">Prognoza 7 dniowa</h3>
        <ul className="space-y-3">
            {
                weatherData?.dailyWeather.map((dailyData) =>
                    <ForecastItem key={dailyData.dayName} dayName={dailyData.dayName} temperature={dailyData.temperature} />)
            }
        </ul>
    </div>;
}