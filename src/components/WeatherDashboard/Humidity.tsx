type HumidityProps = {
    humidity: number;
}

export default function Humidity({ humidity } : HumidityProps) {
    return <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-bold text-lg mb-2">Wilgotność</h3>
        <p className="text-4xl font-bold">{humidity}%</p>
    </div>;
}