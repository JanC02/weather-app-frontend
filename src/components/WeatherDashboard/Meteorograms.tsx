
import DashboardItem from './DashboardItem.tsx';
import type { HourlyDataType } from '../../types';

import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

type MeteorogramProps = {
    hourlyWeather: HourlyDataType[];
};

export default function Meteorogram({ hourlyWeather }: MeteorogramProps) {
    return (
        <DashboardItem className='h-full flex flex-col'>
            <h3 className="font-bold text-lg mb-2">Meteorogram</h3>
            <div className="rounded-lg h-[344px] overflow-x-auto">
                <div className="h-full w-[2500px]">
                    <ResponsiveContainer height="100%" width="100%">
                        <ComposedChart
                            width={2500}
                            height={340}
                            data={hourlyWeather}
                            margin={{ top: 20, right: 30, bottom: 60, left: 20 }}
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
                                label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft' }}
                            />
                            <YAxis
                                yAxisId="precip"
                                orientation="right"
                                tick={{ fontSize: 11 }}
                                label={{ value: 'Opady (mm)', angle: 90, position: 'insideRight' }}
                            />

                            <Tooltip />
                            <Legend />
                            <Bar
                                yAxisId="precip"
                                dataKey="precipitation"
                                barSize={10}
                                fill="#3b82f6"
                                name="Opady (mm)"
                            />
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
            </div>
        </DashboardItem>
    )
}