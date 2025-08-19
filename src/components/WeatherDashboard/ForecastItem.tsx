import { getIcon } from "../../utils/getIcon.ts";

type ForecastItemProps = {
    dayName: string;
    temperature: number;
    weatherCode: number;
};

export default function ForecastItem({ dayName, temperature, weatherCode }: ForecastItemProps) {
    const Icon = getIcon(weatherCode);

    return <li className="flex items-center p-3 bg-gray-50 rounded-lg">
        <span className="font-bold">{dayName}</span>
        <div className="ml-auto flex items-center gap-3">
            <Icon />
            <span className="font-bold w-14 text-right">{temperature}°C</span>
        </div>
    </li>
}