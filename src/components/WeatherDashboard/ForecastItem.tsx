type ForecastItemProps = {
    dayName: string;
    temperature: number;
};

export default function ForecastItem({ dayName, temperature }: ForecastItemProps) {
    return <li className="flex items-center p-3 bg-gray-50 rounded-lg">
        <span className="font-bold">{dayName}</span>
        <div className="ml-auto flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="font-bold w-14 text-right">{temperature}°C</span>
        </div>
    </li>
}