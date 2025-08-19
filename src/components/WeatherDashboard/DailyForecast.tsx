import ForecastItem from './ForecastItem.tsx';
import DashboardItem from './DashboardItem.tsx';
import { type DailyWeatherType } from '../../types';

type DailyForecastProps = {
    dailyWeather: DailyWeatherType[];
};

export default function DailyForecast({ dailyWeather }: DailyForecastProps) {
    return <DashboardItem>
        <h3 className="font-bold text-2xl mb-4">Prognoza 7 dniowa</h3>
        <ul className="space-y-3">
            {
                dailyWeather.map((dailyData) =>
                    <ForecastItem key={dailyData.dayName} dayName={dailyData.dayName} minTemp={dailyData.minTemp} maxTemp={dailyData.maxTemp} weatherCode={dailyData.weatherCode} />)
            }
        </ul>
    </DashboardItem>
}