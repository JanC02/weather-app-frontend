import ForecastItem from './ForecastItem.tsx';
import DashboardItem from './DashboardItem.tsx';

type DailyForecastProps = {
    dailyWeather: { dayName: string, temperature: number, weatherCode: number }[]
};

export default function DailyForecast({ dailyWeather }: DailyForecastProps ) {
    return <DashboardItem>
        <h3 className="font-bold text-2xl mb-4">Prognoza 7 dniowa</h3>
        <ul className="space-y-3">
            {
                dailyWeather.map((dailyData) =>
                    <ForecastItem key={dailyData.dayName} dayName={dailyData.dayName} temperature={dailyData.temperature} weatherCode={dailyData.weatherCode} />)
            }
        </ul>
    </DashboardItem>
}