import type { HourlyDataType } from '../../types.ts';
import ReactApexChart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts';
import MeteorogramWrapper from './MeteorogramWrapper.tsx';
import { useTheme } from '../../contexts/ThemeContext.tsx';
import { useEffect, useState } from 'react';

type TemperatureMeteorogramProps = {
    hourlyWeather: HourlyDataType[];
};

export default function TemperatureMeteorogram({ hourlyWeather }: TemperatureMeteorogramProps) {
    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (theme === 'system') {
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        } else {
            setIsDark(theme === 'dark');
        }
    }, [theme]);

    const series = [
        {
            name: 'temperature',
            data: hourlyWeather.map(item => item.temperature),
        },
    ];

    const options: ApexOptions = {
        chart: {
            height: 300,
            type: 'line',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        colors: ['#ef4444'],
        xaxis: {
            categories: hourlyWeather.map(item => item.label),
            labels: {
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
                style: {
                    fontSize: '10px',
                    colors: isDark ? '#9ca3af' : '#6b7280'
                },
            },
            tickAmount: Math.round(hourlyWeather.length / 4),
        },
        yaxis: {
            title: {
                text: 'Temperatura (°C)',
                style: {
                    color: isDark ? '#9ca3af' : '#6b7280'
                }
            },
            labels: {
                style: {
                    fontSize: '11px',
                    colors: isDark ? '#9ca3af' : '#6b7280'
                }
            }
        },
        tooltip: {
            theme: isDark ? 'dark' : 'light',
            custom: function({ dataPointIndex }) {
                const temp = hourlyWeather[dataPointIndex].temperature;
                const apparentTemp = hourlyWeather[dataPointIndex].apparentTemperature;
                return '<div class="bg-gray-50 dark:bg-slate-700 p-2 rounded-lg text-sm shadow-lg">' +
                    '<p class="label">Temperatura: ' + temp + ' °C</p>' +
                    '<p class="desc">Temperatura odczuwalna: ' + apparentTemp + ' °C</p>' +
                    '</div>';
            }
        },
        grid: {
            borderColor: isDark ? '#334155' : '#e5e7eb',
            padding: {
                bottom: 25,
                left: 25
            }
        },
        legend: {
            show: false
        }
    };

    return (
        <MeteorogramWrapper>
            <ReactApexChart options={options} series={series} type="line" height={300} />
        </MeteorogramWrapper>
    );
}
