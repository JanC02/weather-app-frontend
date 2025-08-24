import type { HourlyDataType } from '../../types';
import type { TooltipContentProps } from 'recharts';

import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

type TemperatureMeteorogramProps = {
    hourlyWeather: HourlyDataType[];
};

const CustomTooltip = ({ active, payload }: TooltipContentProps<string, string>) => {
    const isVisible = active && payload && payload.length;

    return (
        <div className="bg-gray-50 p-2 rounded-lg text-sm shadow-lg" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            {isVisible && (
                <>
                    <p className="label">Temperatura: {payload[0].payload.temperature} °C</p>
                    <p className="desc">Temperatura odczuwalna: {payload[0].payload.apparentTemperature} °C</p></>
            )}
        </div>
    );
};

export default function TemperatureMeteorogram({ hourlyWeather }: TemperatureMeteorogramProps) {
    return (
        <div>
            <h2>Temperatura °C</h2>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart
                    height={340}
                    data={hourlyWeather}
                    margin={{ top: 20, right: 30, bottom: 60, left: 20 }}
                    title='Temperatura'
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="label"
                        tick={{
                            fontSize: 10,
                            textAnchor: 'end',
                            dominantBaseline: 'ideographic'
                        }}
                        interval={3}
                        height={80}
                        angle={-45}
                    />
                    <YAxis
                        yAxisId="temp"
                        orientation="left"
                        tick={{ fontSize: 11 }}
                    />
                    <Tooltip content={CustomTooltip} />
                    <Line
                        yAxisId="temp"
                        type="monotone"
                        dataKey="temperature"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={false}
                        name="Temperatura (°C)"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}