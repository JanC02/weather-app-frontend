import { getIcon } from "../../utils/getIcon.ts";

type ForecastItemProps = {
    dayName: string;
    minTemp: number;
    maxTemp: number;
    weatherCode: number;
};

export default function ForecastItem({ dayName, minTemp, maxTemp, weatherCode }: ForecastItemProps) {
    const Icon = getIcon(weatherCode);

    return <li className="flex items-center p-3 bg-gray-50 dark:bg-slate-700/60 rounded-lg">
        <span className="font-bold">{dayName}</span>
        <div className="ml-auto flex items-center gap-3">
            <Icon className="w-8 h-8" />
            <span className="w-10 font-bold text-right">{maxTemp}°C</span>
            <span className="w-10 text-right text-gray-500 dark:text-gray-400">{minTemp}°C</span>
        </div>
    </li>
}